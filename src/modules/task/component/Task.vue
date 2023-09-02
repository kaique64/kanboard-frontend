<template>
    <span class="text-bold">{{name}}</span>
    <div v-if="description" class="column q-mt-sm">
        <span class="text-bold">Description:</span>
        {{description}}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
    name: string;
    description?: string;
}

const props = defineProps<IProps>();
const name = ref(props.name);
const description = ref(props.description);
</script>
