import { createStore } from 'vuex'

import demo_data from './demo_data'
import { FileSystemDriver } from './FileSystemDriver'

import { fnRandomString, fnSaveFile } from './lib'

// NOTE: Константы
export const DATABASE_PATH = "tasks-database.json"
export const DATABASE_UPDATE_TIMEOUT = 30000

// Create a new store instance.
export default createStore({
    state () {
        return {
            oDatabase: /*demo_data,
            oDefaultDatabase:*/ {
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

            bShowSaveToast: false,

            sTasksFilter: "",

            bShowRepoWindow: true,

            aDefaultRepoList: [
                { type:"localstorage", name: "Локальное хранилище" }
            ],
            aReposList: [],
            iSelectedRepoIndex: null,

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

            bShowTaskMenu: false,
            sTaskMenuX: "",
            sTaskMenuY: "",

            oMenuTask: null,

            sMode: "tasks",
        }
    },
    mutations: {
        fnReposRemove(state, iIndex) {
            state.aReposList.splice(iIndex-state.aDefaultRepoList.length, 1)
            localStorage.setItem('aReposList', JSON.stringify(state.aReposList))
        },
        fnReposSelect(state, iIndex) {
            state.iSelectedRepoIndex = iIndex
        },
        fnReposClean(state) {
            state.aReposList = []
            localStorage.setItem('aReposList', JSON.stringify(state.aReposList))
        },
        fnReposUpdate(state, { iIndex, oObj }) {
            if (iIndex==-1) {
                state.aReposList.push(oObj)
            } else {
                state.aReposList.splice(iIndex-state.aDefaultRepoList.length, 1, oObj)
            }
            localStorage.setItem('aReposList', JSON.stringify(state.aReposList))
        },
        fnLoadRepos(state) {
            try { 
                state.aReposList = JSON.parse(localStorage.getItem('aReposList') || '[]')
            } catch(_) {

            }
        },

        fnUpdateDatabase(state, oDatabase) {
            state.oDatabase = oDatabase
        },
        fnUpdateRepos(state, aReposList) {
            state.aReposList = aReposList
        },

        fnHideRepoWindow(state) {
            state.bShowRepoWindow = false
        },
        fnShowRepoWindow(state) {
            state.bShowRepoWindow = true
        },
        fnShowLoader(state) {
            state.bShowLoader = true
        },
        fnHideLoader(state) {
            state.bShowLoader = false
        },

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
                oItem.color = state.sGroupColor
                state.oDatabase.tasks_groups.push(oItem)
            }
        },
        fnRemoveGroup(state, sID) {
            var iI = state.oDatabase.tasks_groups.findIndex((oI) => oI.id == sID)
            state.oDatabase.tasks_groups.splice(iI, 1)
        },
        fnRemoveBlock(state, sID) {
            var iI = state.oDatabase.tasks_blocks.findIndex((oI) => oI.id == sID)
            state.oDatabase.tasks_blocks.splice(iI, 1)
        },
        fnRemoveTask(state, sID) {
            var iI = state.oDatabase.tasks.findIndex((oI) => oI.id == sID)
            state.oDatabase.tasks.splice(iI, 1)
        },

        fnExportDatabase({ commit, state, dispatch, getters }) {
            fnSaveFile('tasks-database', JSON.stringify(state.oDatabase, null, 4))
        },
        fnImportDatabase({ commit, state, dispatch, getters }, sData) {
            commit('fnUpdateDatabase', JSON.parse(sData))
        },

        fnExportRepos({ commit, state, dispatch, getters }) {
            fnSaveFile('tasks-repos', JSON.stringify(state.aReposList, null, 4))
        },
        fnImportRepos({ commit, state, dispatch, getters }, sData) {
            commit('fnUpdateRepos', JSON.parse(sData))
        },
    },
    actions: {
        fnPrepareRepo({ commit, state, dispatch, getters }) {
            commit('fnHideRepoWindow')
            FileSystemDriver.fnInit(getters.oCurrentRepo)
            dispatch('fnLoadDatabase')
        },
        fnSaveDatabase({ commit, state }) {
            return FileSystemDriver.fnWriteFileJSON(DATABASE_PATH, state.oDatabase)
                .catch(() => {
                    FileSystemDriver.fnReadFile(DATABASE_PATH)
                        .then(() => {
                            return FileSystemDriver.fnWriteFileJSON(DATABASE_PATH, state.oDatabase)
                        })
                })
        },
        fnLoadDatabase({ commit, state }) {
            commit('fnShowLoader')
            FileSystemDriver
                .fnReadFileJSON(DATABASE_PATH)
                .then((mData) => {
                    if (!mData) throw "Cannot destructure property"
                    commit('fnUpdateDatabase', mData)
                    // commit('fnUpdateDatabase', mData=demo_database)
                    commit('fnHideLoader')
                })
                .catch((oE) => {
                    if ((oE+"").match(/Cannot destructure property/)
                        || (oE+"").match(/Not Found/)) {
                        FileSystemDriver.fnWriteFileJSON(DATABASE_PATH, state.oDatabase)
                            .then(() => {
                                FileSystemDriver
                                    .fnReadFileJSON(DATABASE_PATH)
                                    .then((mData) => { 
                                        commit('fnUpdateDatabase', mData)
                                        commit('fnHideLoader')
                                    })
                            })
                    }
                })
        },
    },
    getters: {
        aReposList(state) {
            return state.aDefaultRepoList.concat(state.aReposList)
        },
        oCurrentRepo(state, getters) {
            return getters.aReposList[state.iSelectedRepoIndex]
        },

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