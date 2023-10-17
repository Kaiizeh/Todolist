<script setup>
import { computed, provide, ref } from 'vue';
import { TOAST } from './utils/constants';

//import des views
import Navbar from "./components/Navbar.vue";
import Todolist from "./components/Todolist.vue";
import Home from './components/Home.vue';

//import des composants
import Toast from './ui_components/Toast.vue';

//Différentes vues de l'application
const views = {
  "Todolist": Todolist,
  "Home": Home
};

//path actuel
const path = ref("Home");

//Retour de la vue courante
const currentView = computed(() => {
  return views[path.value] ?? Home;
});

provide("Routing", {
  path,
  changePath: (newPath) => path.value = newPath
});


const todolists = ref(JSON.parse(window.localStorage.getItem("todolists")) ?? []);
const todolist = ref(null);
const index = ref(null);
const isShowToast = ref(false);
const toastInfo = ref(null);

const savingTodolists = (info) => {
  window.localStorage.setItem("todolists", JSON.stringify(todolists.value));
  toastInfo.value = info;
  isShowToast.value = true;
};

provide("TodolistProvider", {
  index,
  todolist,
  todolists,
  setTodolist: (pIndex) => {
    index.value = pIndex;
    todolist.value = todolists.value[pIndex];
  },
  addTodolist: () => {
    todolist.value = {
      title: "Nouvelle liste", 
      tasks: []
    };
    todolists.value.push(todolist.value);
    index.value = todolists.value.length - 1;
    savingTodolists(TOAST.CREATING);
  },
  updateTodolist: (updateTodolist) => {
    todolist.value = updateTodolist;
    todolists.value.splice(index, 1, updateTodolist);
    savingTodolists(TOAST.UPDATING);
  },
  removeTodolist: (pIndex) => {
    if(pIndex == index.value) path.value = "Home";
    todolists.value.splice(pIndex, 1);
    savingTodolists(TOAST.DELETING);
  }
});

</script>

<template>
  <div class="p-2 h-screen bg-base-200">
    <Navbar />
    <component :is="currentView"/>
  </div>
  <Toast :info="toastInfo" @closeToast="() => isShowToast = false" v-if="isShowToast"/>
</template>

<style scoped></style>
