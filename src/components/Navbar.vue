<script setup>
import { faGear, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { inject } from 'vue';

const { todolists, index, addTodolist, setTodolist, removeTodolist } = inject("TodolistProvider");
const { path, changePath } = inject("Routing");

const createTodolist = () => {
    addTodolist();
    changePath('Todolist');
};

const useTodolist = (index) => {
    setTodolist(index);
    changePath('Todolist');
};

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
                    <button class="btn btn-circle hover:btn-error hover:text-white btn-ghost btn-sm tooltip" data-tip="Supprimer la liste" @click.prevent="removeTodolist(i)">
                        <FontAwesomeIcon :icon="faTrash"/>
                    </button>
                </li>
                <div class="h-[1px] w-full bg-base-content mb-2"></div>
                <li class="mb-2 text-white hover:bg-neutral font-semibold p-2 rounded-lg cursor-pointer" @click="null">
                    <FontAwesomeIcon :icon="faGear" class="me-2"/>
                    Paramètres
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
</style>
