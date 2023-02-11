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

            bShowTaskEditWindow: false,

            sSelectedGroupID: null,
            sSelectedTaskID: null,

            sTasksFilter: "",

            sEditTaskID: null,
            sTaskBlockID: "",
            sTaskBlockName: "",
            sTaskName: "",
            sTaskShortDescription: "",
            sTaskFullDescription: "",
            sTaskColor: "",
            sTaskUseColor: "",

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
            state.oDatabase.tasks = state.oDatabase.tasks.filter((oI) => !~aList.findIndex((oFI) => oFI.id == oI.id ))
            for (var oI of aList) {
                oI.block_id = sBlockID
            }
            state.oDatabase.tasks = state.oDatabase.tasks.concat(aList)
        },
        fnOpenTaskEditWindow(state, oItem) {
            state.bShowTaskEditWindow = true;
            
            var oB = state.oDatabase.tasks_blocks.find((oI) => oI.id == oItem.block_id)
            state.sTaskBlockName = oB.name
            state.sTaskBlockID = oB.id

            if (oItem.id) { 
                state.sEditTaskID = oItem.id
                state.sTaskName = oItem.name
                state.sTaskShortDescription = oItem.short_description
                state.sTaskFullDescription = oItem.description
                state.sTaskColor = oItem.color
                state.sTaskUseColor = oItem.use_color
            } else {
                state.sEditTaskID = null
                state.sTaskName = ""
                state.sTaskShortDescription = ""
                state.sTaskFullDescription = ""
                state.sTaskColor = ""
                state.sTaskUseColor = false
            }
        },
        fnSaveTask(state) {
            if (state.sEditTaskID!==null) {
                var oItem = state.oDatabase.tasks.find((oI) => oI.id == state.sEditTaskID)
                oItem.block_id = state.sTaskBlockID
                oItem.name = state.sTaskName
                oItem.short_description = state.sTaskShortDescription
                oItem.description = state.sTaskFullDescription
                oItem.color = state.sTaskColor
                oItem.use_color = state.sTaskUseColor 
            } else {
                var oItem = {}
                oItem.block_id = state.sTaskBlockID
                oItem.name = state.sTaskName
                oItem.short_description = state.sTaskShortDescription
                oItem.description = state.sTaskFullDescription
                oItem.color = state.sTaskColor
                oItem.use_color = state.sTaskUseColor 
                state.oDatabase.tasks.push(oItem)
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
            return state.oDatabase.tasks.filter((oI) => oI.block_id == sBlockID && ~oI.name.indexOf(state.sTasksFilter));
        },

        fnGetBlock: (state) => (sBlockID) => {
            return state.oDatabase.tasks_blocks.filter((oI) => oI.block_id == sBlockID);
        }
    }
})