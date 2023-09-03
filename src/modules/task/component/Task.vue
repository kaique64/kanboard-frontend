<template>
    <span class="text-bold">{{task.name}}</span>
    <div v-if="task.description" class="column q-mt-sm">
        <span class="text-bold">Description:</span>
        {{task.description}}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TaskDTO } from '../types/dtos/TaskDTO';

interface IProps {
    task: TaskDTO
}

const props = defineProps<IProps>();
const task = ref(props.task);
</script>
