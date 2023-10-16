<script setup>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const props = defineProps(["title"]);

</script>



<template>
    <div class="mask">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">

                <div class="card-actions justify-between">
                    <span class="text-xl font-bold">{{ props.title }}</span>
                    <button class="btn btn-square btn-sm hover:btn-error">
                        <FontAwesomeIcon :icon="faXmark" />
                    </button>
                </div>
                <slot>

                </slot>
                <div class="flex flex-row mx-auto">
                    <button class="btn btn-success btn-outline ms-3" @click="$emit('confirmAction')">
                        Valider
                    </button>
                    <button class="btn btn-error btn-outline ms-3" @click="$emit('denyAction')">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.mask {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
}
</style>
