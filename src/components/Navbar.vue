<script setup>
import { faGear, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject, ref } from 'vue';
import Modal from '../ui_components/Modal.vue';

const { todolists, index, addTodolist, setTodolist, removeTodolist } = inject("TodolistProvider");
const { path, changePath } = inject("Routing");

const isOpenModal = ref(false);
const todolistTarget = ref(null);

const createTodolist = () => {
    addTodolist();
    changePath('Todolist');
};

const useTodolist = (index) => {
    setTodolist(index);
    changePath('Todolist');
};

const remove = () => {
    removeTodolist(todolistTarget.value);
    manageModal(null);
}

const manageModal = (i) => {
    todolistTarget.value = i;
    isOpenModal.value = !isOpenModal.value;
}

</script>

<template>
    <div class="flex">
        <div class="w-[15rem] bg-base-100 p-4 rounded-lg absolute top-4 bottom-4">
            <div class="text-white text-2xl font-semibold mb-4">
                <button class="btn btn-success w-full" @click="createTodolist">
                    <FontAwesomeIcon :icon="faPlus" size="lg" />
                    Ajouter une liste
                </button>
            </div>
            <ul>
                <li v-for="(todolist, i) in todolists" class="mb-2 text-white hover:bg-neutral font-semibold p-2 rounded-lg cursor-pointer flex justify-between items-center" :class="{'bg-primary-focus': (index == i)}" @click="() => useTodolist(i)">
                    {{ todolist.title ?? "Liste des tâches " + i }}
                    <button class="btn btn-circle hover:btn-error hover:text-white btn-ghost btn-sm tooltip" data-tip="Supprimer la liste" @click.stop="manageModal(i)">
                        <FontAwesomeIcon :icon="faTrash"/>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <Modal title="Suppression d'une liste" @confirmAction="remove()" @denyAction="() => manageModal(null)" v-if="isOpenModal">
        <div class="text-center">
            Êtes-vous sûr de vouloir supprimer la liste "{{ todolists[todolistTarget].title }}"
        </div>
    </Modal>
</template>

<style scoped>
</style>
