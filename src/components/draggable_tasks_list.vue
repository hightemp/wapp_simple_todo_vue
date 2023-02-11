<template>
    <div class="block-tasks list list-group">
        <draggable v-model="aTasks" item-key="id" group="people" ghost-class="ghost" @start="drag=true" @end="drag=false" :sort="true">
            <template #item="{element}">
                <div 
                    type="button" :class="'list-card '+(element.id == sSelectedTaskID ? 'active' : '')" aria-current="true">

                    <div v-if="element.use_color" class="task-color" :style="{background:element.color}"></div>
                    <div class="title">{{element.name}}</div>
                    <div class="description">{{element.short_description}}</div>

                    <div class="actions-panel">
                        <div class="btn" @click="fnClickItem($event, element)"><i class="bi bi-pencil"></i></div>
                        <!-- <dropdown :items="aTasksDropdownMenu" @clickitem="(oE) => fnClickItem(oE, element)" cls="drop-menu-left"/> -->
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>

import draggable from 'vuedraggable'
import dropdown from "../components/dropdown.vue"
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import { a, cc } from "../lib"

export default {
    components: {
        draggable,
        dropdown
    },
    
    emits: ['clickedititem'],
    props: ['block_id'],

    computed: {
        ...cc(`sSelectedTaskID bShowTaskMenu sTaskMenuX sTaskMenuY oMenuTask`),
        aTasks: {
            get() { return this.$store.getters.fnGetBlockTasks(this.block_id) },
            // get() { return this.$store.state.oDatabase.tasks.filter((oI) => oI.block_id == this.block_id) },
            set(aV) { this.$store.commit('fnUpdateTasksListForBlock', { sBlockID: this.block_id, aList: aV }) }
        }
    },

    data() {
        return {
            drag: false,
        }
    },

    methods: {
        ...mapMutations(a`fnOpenTaskEditWindow fmRemoveTask`),
        fnClickItem(oEvent, oItem) {
            var oB = oEvent.target.getBoundingClientRect()
            this.sTaskMenuX = oB.x
            this.sTaskMenuY = oB.y+oB.height
            this.oMenuTask = oItem
            this.bShowTaskMenu = true
            oEvent.stopPropagation()
        }
    }
}
</script>

<style>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>