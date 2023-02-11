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

            sTasksFilter: "",

            bShowTaskEditWindow: false,

            sEditTaskID: null,
            sTaskBlockID: "",
            sTaskBlockName: "",
            sTaskName: "",
            sTaskShortDescription: "",
            sTaskFullDescription: "",
            sTaskColor: "",
            sTaskUseColor: "",

            bShowBlockEditWindow: false,

            sEditBlockID: null,
            sBlockName: "",

            bShowGroupEditWindow: false,

            sEditGroupID: null,
            sGroupName: "",
            sGroupColor: "",

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
                state.oDatabase.tasks_last_id++
                oItem.id = state.oDatabase.tasks_last_id
                oItem.block_id = state.sTaskBlockID
                oItem.name = state.sTaskName
                oItem.short_description = state.sTaskShortDescription
                oItem.description = state.sTaskFullDescription
                oItem.color = state.sTaskColor
                oItem.use_color = state.sTaskUseColor 
                state.oDatabase.tasks.push(oItem)
            }
        },
        fnOpenBlockEditWindow(state, oItem) {
            state.bShowBlockEditWindow = true;
            
            var oB = state.oDatabase.tasks_groups.find((oI) => oI.id == oItem.group_id)
            state.sBlockGroupID = oB.id

            if (oItem.id) { 
                state.sEditBlockID = oItem.id
                state.sBlockName = oItem.name
            } else {
                state.sEditBlockID = null
                state.sBlockName = ""
            }
        },
        fnSaveBlock(state) {
            if (state.sEditBlockID!==null) {
                var oItem = state.oDatabase.tasks_blocks.find((oI) => oI.id == state.sEditBlockID)
                oItem.group_id = state.sBlockGroupID
                oItem.name = state.sBlockName
            } else {
                var oItem = {}
                state.oDatabase.tasks_blocks_last_id++
                oItem.id = state.oDatabase.tasks_blocks_last_id
                oItem.group_id = state.sBlockGroupID
                oItem.name = state.sBlockName
                state.oDatabase.tasks_blocks.push(oItem)
            }
        },
        fnOpenGroupEditWindow(state, oItem) {
            state.bShowGroupEditWindow = true;
            
            if (oItem.id) { 
                state.sEditGroupID = oItem.id
                state.sGroupName = oItem.name
                state.sGroupColor = oItem.color
            } else {
                state.sEditGroupID = null
                state.sGroupName = ""
                state.sGroupColor = ""
            }
        },
        fnSaveGroup(state) {
            if (state.sEditGroupID!==null) {
                var oItem = state.oDatabase.tasks_groups.find((oI) => oI.id == state.sEditGroupID)
                oItem.name = state.sGroupName
                oItem.color = state.sGroupColor
            } else {
                var oItem = {}
                state.oDatabase.tasks_groups_last_id++
                oItem.id = state.oDatabase.tasks_groups_last_id
                oItem.name = state.sGroupName
                oItem.color = "#eee"
                state.oDatabase.tasks_groups.push(oItem)
            }
        },
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