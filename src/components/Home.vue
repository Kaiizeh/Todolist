<script setup>
import { inject } from 'vue';
import { STATES } from '../utils/constants';

const { todolists, setTodolist } = inject("TodolistProvider");
const { changePath } = inject("Routing");


const getProgress = (todolist) => {
    return todolist.tasks.filter(task => task.state.label === STATES.COMPLETE.label).length
}

const useTodolist = (index) => {
    setTodolist(index);
    changePath('Todolist');
};

</script>



<template>
    <div
        class="grid grid-cols-3 grid-rows-4 gap-2 p-2 absolute left-[16.5rem] top-4 bottom-4 right-4 bg-base-100 rounded-lg overflow-y-auto">
        <div class="card w-full bg-base-200 shadow-xl" v-for="(todolist, index) in todolists">
            <div class="card-body">
                <h2 class="card-title">{{ todolist.title }}</h2>
                <span>
                    Taux de complétion
                </span>
                <progress class="progress progress-primary w-full mb-5" :value="getProgress(todolist)" :max="todolist.tasks.length"></progress>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary btn-outline btn-sm" @click="useTodolist(index)">Sélectionner !</button>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped></style>
