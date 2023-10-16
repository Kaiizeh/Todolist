<script setup>
import { computed, provide, ref } from 'vue';

//import des composants
import Navbar from "./components/Navbar.vue";
import Todolist from "./components/Todolist.vue";
import Home from './components/Home.vue';

//Différentes vues de l'application
const views = {
  "Todolist": Todolist,
  "Home": Home,
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

console.log(todolists.value);

const savingTodolists = () => {
  window.localStorage.setItem("todolists", JSON.stringify(todolists.value));
  console.log("Saving...", todolists.value);
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
    todolists.value.push({title: "Nouvelle liste", tasks: []});
    index.value = todolists.value.length - 1;
    savingTodolists();
  },
  updateTodolist: (updateTodolist) => {
    todolist.value = updateTodolist;
    todolists.value.splice(index, 1, updateTodolist);
    savingTodolists();
  },
  removeTodolist: (pIndex) => {
    todolists.value.splice(pIndex, 1);
    savingTodolists();
  }
});

</script>

<template>
  <div class="p-2 h-screen bg-base-200">
    <Navbar />
    <component :is="currentView"/>
  </div>
</template>

<style scoped></style>
