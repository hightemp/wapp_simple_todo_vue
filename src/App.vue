<template>
  <div class="wrapper">
    <div class="left-panel">
      <button v-for="(oMenuItem, iI) in aMenu" :key="iI" class="btn" @click="fnClickLeftMenu(oMenuItem)" :title="oMenuItem.title"><i :class="'bi '+oMenuItem.icon"></i></button>
    </div>
    <template v-if="sMode=='tasks'">
      <div class="groups-panel">
        <div class="actions-panel">
          <input type="text" class="form-control" v-model="sGroupsFilter">
          <!-- NOTE: Группы -->
          <dropdown :items="aGroupsDropdownMenu" @clickitem="fnGroupClickItem"/>
        </div>
        <div class="list list-group">
          <template v-for="(oI, iI) in aGroups" :key="iI">
            <button type="button" :class="'list-group-item list-group-item-action '+(oI.id == sSelectedGroupID ? 'active' : '')" @click="fnSelectGroup(oI.id)" aria-current="true">
            {{oI.name}}
            </button>
          </template>
        </div>
      </div>

      <template v-if="oCurrentGroup">
        <div class="tasks-panel-wrapper" :style="{background:oCurrentGroup.color}">
          <div class="title-panel">
            <div class="title">{{oCurrentGroup.name}}</div>
            <div class="actions-panel">
              <!-- NOTE: Фильтр + кнопки сверху -->
              <div class="task-filter">
                <input type="text" class="form-control" v-model="sTasksFilter">
              </div>
              <button class="btn"><i class="bi bi-filter"></i>Фильтр</button>
              <dropdown :items="aGroupsOptionsDropdownMenu" @clickitem="fnGroupOptionsClickItem" cls="drop-menu-left"/>
            </div>
          </div>
          <div class="tasks-panel">
            <template v-for="(oI, iI) in aCurrentGroupBlocks" :key="iI">
              <div class="block-panel">
                <div class="block-name">
                  <div class="title">{{ oI.name }}</div>
                  <!-- NOTE: Блоки -->
                  <dropdown :items="aBlockDropdownMenu" cls="drop-menu-left" @clickitem="(oE) => fnBlockClickItem(oE, oI)"/>
                </div>
                <!-- NOTE: Задачи -->
                <draggable_tasks_list :block_id="oI.id"/>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>

  <edit_task_window />
  <edit_block_window />
  <edit_group_window />

  <ul 
    ref="task_menu"
    :class="'dropdown-menu task-menu '+(bShowTaskMenu ? 'show' : '')" 
    :style="{ top: sTaskMenuY+'px', left: sTaskMenuX+'px' }"
  >
    <li v-for="oI in aTasksDropdownMenu" :key="oI.id"><a class="dropdown-item" href="#" @click="fnTaskClickItem(oI)" v-html="oI.title"></a></li>
  </ul>
</template>

<script>

import draggable_tasks_list from './components/draggable_tasks_list.vue'
import dropdown from "./components/dropdown.vue"
import edit_task_window from "./components/edit_task_window.vue"
import edit_block_window from "./components/edit_block_window.vue"
import edit_group_window from "./components/edit_group_window.vue"

import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import { a, cc } from "./lib"

export default {
  name: 'App',

  components: {
    dropdown,
    draggable_tasks_list,
    edit_task_window,
    edit_block_window,
    edit_group_window,
  },

  computed: {
    ...mapGetters(a`aCurrentGroupBlocks oCurrentGroup fnGetBlockTasks aTasks`),
    ...cc(`sSelectedGroupID sSelectedTaskID sMode sTasksFilter sTaskMenuX sTaskMenuY bShowTaskMenu oMenuTask`),
    aGroups() { return this.$store.getters.fnFilterGroups(this.sGroupsFilter) },
  },

  data() {
    return {
      aMenu: [
        { id: "repo-window", title: "Выбрать репозиторий", icon: "bi-person-fill" },
        { id: "tasks", title: "Задачи", icon: "bi-layout-three-columns" }
      ],

      sGroupsFilter: "",

      aGroupsDropdownMenu: [
        { id:"add", title:'<i class="bi bi-plus-lg"></i> Добавить группу' },
        { id:"edit", title:'<i class="bi bi-pencil"></i> Редактировать' },
        { id:"delete", title:'<i class="bi bi-trash"></i> Удалить' },
      ],
      aBlockDropdownMenu: [
        { id:"add-task", title:'<i class="bi bi-plus-lg"></i> Добавить задачу' },
        { id:"edit", title:'<i class="bi bi-pencil"></i> Редактировать' },
        { id:"delete", title:'<i class="bi bi-trash"></i> Удалить' },
      ],
      aGroupsOptionsDropdownMenu: [
        { id:"add", title:'<i class="bi bi-plus-lg"></i> Добавить блок' },
      ],
      aTasksDropdownMenu: [
        { id:"edit", title:'<i class="bi bi-pencil"></i> Редактировать' },
        { id:"delete", title:'<i class="bi bi-trash"></i> Удалить' },
      ]
    }
  },

  methods: {
    ...mapMutations(a`fnSelectGroup fnSelectTask fnOpenTaskEditWindow fnOpenBlockEditWindow fnOpenGroupEditWindow fnRemoveGroup fnRemoveBlock fnRemoveTask`),
    fnGroupClickItem(oItem) {
      if (oItem.id == "add") {
        this.fnOpenGroupEditWindow({})
      }
      if (oItem.id == "edit") {
        if (!this.oCurrentGroup) {
          return;
        }
        this.fnOpenGroupEditWindow(this.oCurrentGroup)
      }
      if (oItem.id == "delete") {
        this.fnRemoveGroup(this.oCurrentGroup.id)
      }
    },
    fnClickLeftMenu(oItem) {
      if (oItem.id == "tasks") {
        this.sMode = "tasks"
      }
    },
    fnBlockClickItem(oItem, oBlock) {
      if (oItem.id == "add-task") {
        this.fnOpenTaskEditWindow({ block_id: oBlock.id })
      }
      if (oItem.id == "edit") {
        this.fnOpenBlockEditWindow(oBlock)
      }
      if (oItem.id == "delete") {
        this.fnRemoveBlock(oBlock.id)
      }
    },
    fnGroupOptionsClickItem(oItem, oGroup) {
      if (oItem.id == "add") {
        this.fnOpenBlockEditWindow({ group_id: this.oCurrentGroup.id })
      }
    },
    fnTaskClickItem(oE) {
      if (oE.id == "edit") {
          // this.$emit('clickedititem', oItem)
          this.fnOpenTaskEditWindow(this.oMenuTask)
      }
      if (oE.id == "delete") {
          this.fnRemoveTask(this.oMenuTask.id)
      }
      this.bShowTaskMenu = false
    },
  },
  created() {
    var oThis = this
    window.addEventListener('click', (e) => {
      if (this.bShowTaskMenu) {
        if (oThis.$refs.task_menu.contains(e.target)) {

        } else {
          this.bShowTaskMenu = false
        }
      }
    })        
  }
}
</script>
