<template>
    <span class="text-bold">{{task.name}}</span>
    <div v-if="task.description" class="column q-mt-sm">
        <span class="text-bold">Description:</span>
        {{task.description}}
    </div>
    <div class="row justify-start items-center q-mt-xs">
        <Button 
            id="update-task" 
            flat 
            size="md" 
            color="blue" 
            class="q-mr-xs" 
            icon="mdi-pencil-outline" 
            @click="openUpdateTaskDialog"
        >
            <template #default>
            <q-tooltip class="text-capitalize">Update task</q-tooltip>
            </template>
        </Button>
        <Button 
            id="delete-task" 
            flat 
            size="md" 
            color="red" 
            icon="mdi-trash-can-outline"
            @click="openDeleteTaskDialog"
        >
            <template #default>
            <q-tooltip class="text-capitalize">Delete task</q-tooltip>
            </template>
        </Button>
    </div>
    <UpdateTaskDialog 
        :model-value="updateTaskDialog" 
        :title="`Update task - ${task.name}`"
        @close="closeUpdateTaskDialog" 
        @cancel="closeUpdateTaskDialog"
        :board-id="task.boardId"
        :task="task"
        :task-id="task.id"
    />
    <DeleteTaskDialog 
        :model-value="deleteTaskDialog" 
        :title="`Delete task - ${task.name}`"
        @close="closeDeleteTaskDialog" 
        @cancel="closeDeleteTaskDialog"
        :board-id="task.boardId"
        :task="task"
        :task-id="task.id"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TaskDTO } from '../types/dtos/TaskDTO';
import UpdateTaskDialog from './UpdateTaskDialog.vue';
import Button from '../../../common/component/button/Button.vue';
import { TaskFormDTO } from '../types/dtos/TaskFormDTO';
import DeleteTaskDialog from './DeleteTaskDialog.vue';

interface IProps {
    task: TaskDTO;
}

const props = defineProps<IProps>();
const task = ref(props.task as TaskFormDTO);
const updateTaskDialog = ref(false);
const deleteTaskDialog = ref(false);

function openUpdateTaskDialog() {
  updateTaskDialog.value = true;
}

function closeUpdateTaskDialog() {
  updateTaskDialog.value = false;
}

function openDeleteTaskDialog() {
  deleteTaskDialog.value = true;
}

function closeDeleteTaskDialog() {
  deleteTaskDialog.value = false;
}
</script>
