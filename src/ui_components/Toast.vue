<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps(["info"]);
const emits = defineEmits(["closeToast"])

setTimeout(() => {
    emits("closeToast");
}, 7000);
</script>

  

<template>
    <div class="toast animation">
        <div class="alert text-base-100" :style="{ background: props.info.color }">
            <span>{{ props.info.message }}</span>
        </div>
    </div>
</template>

  

<style scoped>
@keyframes upSlide {
    0% {
        opacity: 1;
        position: absolute;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-50px);
    }
}

.animation {
    animation: upSlide 2s 5s ease-in-out;
}
</style>