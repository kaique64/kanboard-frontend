<template>
    <q-card 
        class="q-ma-md q-pa-md" 
        style="min-width: 23rem;"
    >
        <span class="text-bold text-h6">{{ name }}</span>
        <slot name="content"></slot>
    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
    name: string;
}

const props = defineProps<IProps>();
const name = ref(props.name);

</script>
