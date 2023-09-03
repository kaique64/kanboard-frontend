<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="40vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <TaskForm 
                    :task-form="task"
                    @cancel="$emit('cancel')" 
                    @submit="handleUpdateTask" 
                    submit-button-label="Update"
                />
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import { TaskService } from '../../task/service/TaskService';
import { useQuasar } from 'quasar';
import TaskForm from '../../task/component/TaskForm.vue';
import { TaskFormDTO } from '../../task/types/dtos/TaskFormDTO';

interface IProps {
    modelValue: any;
    title: string;
    taskId: number;
    task: TaskFormDTO;
    boardId: number;
}

const emit = defineEmits(['close', 'cancel', 'onAdd'])
const props = defineProps<IProps>()
const title = ref(props.title);
const taskId = ref(props.taskId);
const boardId = ref(props.boardId);
const $q = useQuasar();
const taskService = TaskService();

async function handleUpdateTask(formValues: TaskFormDTO) {
    await updateTask(formValues);
    emit('close');
}

async function updateTask(formValues: TaskFormDTO) {
  const task = {
    name: formValues.name,
    description: formValues.description,
  }

  const taskUpdated = await taskService.updateTask(task, taskId.value, boardId.value);

  if (taskUpdated) {
    $q.notify({
        message: 'Task updated successfully!',
        type: 'positive',
        color: 'green-5',
        position: 'top-right'
    });
  }
}

</script>