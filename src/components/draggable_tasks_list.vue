<template>
    <div class="block-tasks list list-group">
        <draggable v-model="aTasks" item-key="id" group="people" ghost-class="ghost" @start="drag=true" @end="drag=false">
            <template #item="{element}">
                <div 
                    type="button" :class="'list-card '+(element.id == sSelectedTaskID ? 'active' : '')" aria-current="true">
                    <div class="actions-panel">
                    <div class="btn"><i class="bi bi-pencil"></i></div>
                    </div>

                    <div v-if="element.color" class="task-color" :style="{background:element.color}"></div>
                    <div class="title">{{element.name}}</div>
                    <div class="description">{{element.short_description}}</div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>

import draggable from 'vuedraggable'
import { a, cc } from "../lib"

export default {
    components: {
        draggable,
    },
    
    props: ['block_id'],

    computed: {
        ...cc(`sSelectedTaskID`),
        aTasks: {
            get() { return this.$store.getters.fnGetBlockTasks(this.block_id) },
            // get() { return this.$store.state.oDatabase.tasks.filter((oI) => oI.block_id == this.block_id) },
            set(aV) { this.$store.commit('fnUpdateTasksListForBlock', { sBlockID: this.block_id, aList: aV }) }
        }
    },

    data() {
        return {
            drag: false
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