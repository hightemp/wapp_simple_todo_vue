<template>
<div v-show="bShowTaskEditWindow">
    <div class="block-overlay"></div>
    <div class="modal show" id="modal-edit-category" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Редактирование задачи</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="fnClose"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="" class="form-label">Блок: {{sTaskBlockName}}</label>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Название</label>
                        <input type="text" class="form-control" v-model="sTaskName">
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Краткое описание</label>
                        <textarea rows="10" class="form-control" v-model="sTaskShortDescription"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Полное описание</label>
                        <textarea rows="10" class="form-control" v-model="sTaskFullDescription"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label"><input type="checkbox" v-model="sTaskUseColor"/> Цвет</label>
                        <input type="color" class="form-control" v-model="sTaskColor">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="fnClose">Отмена</button>
                    <button id="category-edit-save" type="button" class="btn btn-success" @click="fnSave">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

import { a, cc } from "../lib"

export default {
    name: "EditArticle",

    props: {},

    computed: {
        ...cc(`bShowTaskEditWindow sTaskBlockName sTaskUseColor sTaskName sTaskShortDescription sTaskFullDescription sTaskColor`),
    },

    data() {
        return {

        }
    },

    methods: {
        ...mapMutations(a`fnSaveTask`),
        // ...mapActions(a``),
        fnSave() {
            this.fnSaveTask()
            this.bShowTaskEditWindow = false
        },
        fnClose() {
            this.bShowTaskEditWindow = false
        }
    },
}
</script>

<style>

</style>