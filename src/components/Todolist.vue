<script setup>
import { faList, faCheck, faXmark, faListCheck, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, inject, ref } from 'vue';
import { STATES } from "../utils/constants";
import Modal from '../ui_components/Modal.vue';

const { todolist, updateTodolist } = inject("TodolistProvider");

const tasks = ref(todolist.value?.tasks ?? []);
const isEditTitle = ref(false);
const isEditLabel = ref(false);
const isEditState = ref(false);
const isOpenModal = ref(false);
const indexTask = ref(null);

const newTitle = ref(null);
const newLabel = ref(null);

const manageModal = (index) => {
    isOpenModal.value = !isOpenModal.value;
    indexTask.value = index
};

const manageEditTitle = () => {
    isEditTitle.value = !isEditTitle.value;
    newTitle.value = null;
};

const applyNewTitle = () => {
    updateTodolist({
        ...todolist.value,
        title: newTitle.value,
    });
    manageEditTitle();
};

const addTask = () => {
    let task = {
        label: "Nouvelle tâche",
        state: STATES.TODO,
    }
    tasks.value.push(task);
    updateTodolist({
        ...todolist.value,
        tasks: tasks.value,
        lastUpdate: new Date()
    });
};

const removeTask = () => {
    tasks.value.splice(indexTask.value, 1);
    updateTodolist({
        ...todolist.value,
        tasks: tasks.value,
        lastUpdate: new Date()
    });
    isOpenModal.value = false;
};

const openEditLabel = (index) => {
    indexTask.value = index;
    isEditLabel.value = true;
};

const closeEditLabel = () => {
    indexTask.value = null;
    newLabel.value = null;
    isEditLabel.value = false;
};

const applyNewLabel = () => {
    tasks.value[indexTask.value].label = newLabel.value;
    updateTodolist({
        ...todolist.value,
        tasks: tasks.value,
    });
    closeEditLabel();
};

const openMenuState = (index) => {
    indexTask.value = index
    isEditState.value = true;
};

const closeMenuState = () => {
    indexTask.value = null;
    isEditState.value = false;
};

const applyNewState = (state) => {
    tasks.value[indexTask.value].state = state;
    updateTodolist({
        ...todolist.value,
        tasks: tasks.value,
    });
    closeMenuState();
};

const invalidLabel = computed(() => (newLabel.value === null || newLabel.value.length === 0));
const invalidTitle = computed(() => (newTitle.value === null || newTitle.value.length === 0));

const getProgress = tasks => {
    return tasks.length > 0 ? (tasks.filter(task => task.state.label ===
                        STATES.COMPLETE.label).length /
                        tasks.length * 100).toFixed(2) : 0
}

</script>

<template>
    <div class="absolute left-[16.5rem] top-4 bottom-4 right-4 bg-base-100 rounded-lg text-white p-4">
        <div class="h-full w-full flex flex-col">
            <!-- Title bloc -->
            <div class="text-3xl font-bold tooltip text-start" v-if="!isEditTitle">
                <span class="tooltip tooltip-bottom cursor-pointer" data-tip="Cliquer pour modifier le titre"
                    @click="manageEditTitle">
                    {{ todolist?.title }}
                </span>
            </div>
            <div class="form-control w-full max-w-xs" v-if="isEditTitle">
                <div class="join">
                    <input type="text" :placeholder="todolist.title ?? 'Ex: Liste de courses'"
                        class="input input-bordered input-primary w-full max-w-xs join-item" v-model="newTitle" />
                    <div class="indicator">
                        <button class="btn btn-success join-item" @click="applyNewTitle" :disabled="invalidTitle">
                            <FontAwesomeIcon :icon="faCheck" />
                        </button>
                        <button class="btn btn-error join-item" @click="manageEditTitle">
                            <FontAwesomeIcon :icon="faXmark" />
                        </button>
                    </div>
                </div>
            </div>
            <!-- End title bloc -->

            <div class="stats shadow my-5">
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <FontAwesomeIcon :icon="faList" size="2xl" />
                    </div>
                    <div class="stat-title">Nombre de tâche</div>
                    <div class="stat-value">{{ tasks.length }}</div>
                    <div class="stat-desc">Dernière ajout : Aujourd'hui</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <FontAwesomeIcon :icon="faListCheck" size="2xl" />
                    </div>
                    <div class="stat-title">Tâches complétées</div>
                    <div class="stat-value">{{ tasks.filter(task => task.state.label === STATES.COMPLETE.label).length }}
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <FontAwesomeIcon :icon="faBarsProgress" size="2xl" />
                    </div>
                    <div class="stat-title">Progression</div>
                    <div class="stat-value">{{ getProgress(tasks) }}%</div>
                </div>

            </div>

            <div class="flex flex-col">
                <div>
                    <span class="text-2xl">Liste des tâches</span>
                    <button class="btn btn-outline btn-success btn-sm ms-5" @click="addTask">
                        Ajouter une tâche
                    </button>
                </div>
                <ul class="h-[40rem] overflow-y-auto">
                    <li v-for="(task, index) in tasks" class="flex items-center w-full text-xl relative mt-2">
                        <div v-if="indexTask !== index || !isEditLabel" @click.stop="openEditLabel(index)"
                            class="cursor-pointer w-full">
                            <div :style="{ background: task.state.color }"
                                class="w-[15px] h-[15px] rounded me-2 tooltip tooltip-right cursor-pointer"
                                data-tip="Cliquer pour changer l'état de la tâche" @click.stop="openMenuState(index)"></div>
                            <span>{{ task.label }}</span>
                            <button class="btn btn-circle btn-outline btn-error btn-sm float-right"
                                @click.stop="() => manageModal(index)">
                                <FontAwesomeIcon :icon="faTrashCan" />
                            </button>
                        </div>
                        <div class="form-control w-full" v-if="indexTask === index && isEditLabel">
                            <div class="join">
                                <input type="text" :placeholder="task.label ?? 'Ex: Liste de courses'"
                                    class="input input-bordered input-primary w-full join-item" v-model="newLabel" />
                                <div class="indicator">
                                    <button class="btn btn-success join-item" @click="applyNewLabel"
                                        :disabled="invalidLabel">
                                        <FontAwesomeIcon :icon="faCheck" />
                                    </button>
                                    <button class="btn btn-error join-item" @click="closeEditLabel">
                                        <FontAwesomeIcon :icon="faXmark" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul class="bg-base-200 w-56 rounded-box absolute p-2 top-4 z-50"
                            v-if="isEditState && indexTask === index">
                            <div class="flex w-full justify-between items-center">
                                <span class="text-xs">Choisir un nouvelle état</span>
                                <button
                                    class="btn btn-circle btn-ghost hover:btn-error btn-xs float-right hover:text-base-100"
                                    @click="closeMenuState">
                                    <FontAwesomeIcon :icon="faXmark" />
                                </button>
                            </div>
                            <li v-for="state in STATES" @click="applyNewState(state)"
                                class="flex flex-row items-center p-1 w-full cursor-pointer hover:bg-base-100 rounded transition duration-300">
                                <div class="rounded w-[15px] h-[15px] me-3" :style="{ background: state.color }"></div>
                                <span class="text-sm">{{ state.label }}</span>
                            </li>
                        </ul>

                    </li>
                </ul>
            </div>
        </div>
    </div>
    <Modal title="Suppression d'une tâche" @confirmAction="removeTask()" @denyAction="() => manageModal(null)"
        v-if="isOpenModal">
        <div class="text-center">
            Êtes-vous sûr de vouloir supprimer la tâche "{{ tasks[indexTask].label }}"
        </div>
    </Modal>
</template>

<style scoped></style>