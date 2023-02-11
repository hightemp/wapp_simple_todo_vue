<template>
<div v-show="bShowGroupEditWindow">
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
                        <label for="" class="form-label">Название</label>
                        <input type="text" class="form-control" v-model="sGroupName">
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Цвет</label>
                        <input type="color" class="form-control" v-model="sGroupColor">
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
    props: {},

    computed: {
        ...cc(`bShowGroupEditWindow sGroupName sGroupColor`),
    },

    data() {
        return {

        }
    },

    methods: {
        ...mapMutations(a`fnSaveGroup`),
        // ...mapActions(a``),
        fnSave() {
            this.fnSaveGroup()
            this.bShowGroupEditWindow = false
        },
        fnClose() {
            this.bShowGroupEditWindow = false
        }
    },
}
</script>

<style>

</style>