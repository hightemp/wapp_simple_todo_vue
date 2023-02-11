import { createStore } from 'vuex'

import demo_data from './demo_data'
import { FileSystemDriver } from './FileSystemDriver'

import { fnRandomString } from './lib'

// NOTE: Константы
export const DATABASE_PATH = "tasks-database.json"
export const DATABASE_UPDATE_TIMEOUT = 30000

// Create a new store instance.
export default createStore({
    state () {
        return {
            oDatabase: demo_data,
            oDefaultDatabase: {
                tasks_groups_last_id: 0,
                tasks_groups: [],
                tasks_blocks_last_id: 0,
                tasks_blocks: [],
                tasks_last_id: 0,
                tasks: [],
                archived_tasks_last_id: 0,
                archived_tasks: [],
            },

            sSelectedGroupID: null,
            sSelectedTaskID: null,

            sMode: "tasks",
        }
    },
    mutations: {
        fnUpdateVar(state, { sName, sV }) {
            state[sName] = sV
        },

        fnSelectGroup(state, sID) {
            state.sSelectedGroupID = sID
        },
        fnSelectTask(state, sID) {
            state.sSelectedTaskID = sID
        },
        fnUpdateTasks(state, aList) {
            state.oDatabase.tasks = aList
        },
        fnUpdateTasksListForBlock(state, { sBlockID, aList }) {
            console.log({ sBlockID, aList, tasks: state.oDatabase.tasks });
            for (var oI of aList) {
                // var oE = state.oDatabase.tasks.find((oIT) => oIT.id == oI.id)
                // console.log({})
                oI.block_id = sBlockID
            }
        }
    },
    actions: {

    },
    getters: {
        fnFilterGroups: (state) => (sFilter) => {
            return state.oDatabase.tasks_groups.filter((oI) => ~oI.name.indexOf(sFilter))
        },

        aGroups(state) {
            return state.oDatabase.tasks_groups
        },

        aTasks(state) {
            return state.oDatabase.tasks
        },

        oCurrentGroup(state) {
            return state.oDatabase.tasks_groups.find((oI) => oI.id == state.sSelectedGroupID);
        },

        aCurrentGroupBlocks(state) {
            return state.oDatabase.tasks_blocks.filter((oI) => oI.group_id == state.sSelectedGroupID)
        },

        fnGetBlockTasks: (state) => (sBlockID) => {
            return state.oDatabase.tasks.filter((oI) => oI.block_id == sBlockID);
        }
    }
})