<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="60vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <TaskForm 
                    @cancel="$emit('cancel')" 
                    @submit="handleAddTask" 
                    submit-button-label="Add"
                />
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import { TaskService } from '../../task/service/TaskService';
import { useQuasar } from 'quasar';
import TaskForm from '../../task/component/TaskForm.vue';
import { TaskFormDTO } from '../../task/types/dtos/TaskFormDTO';

interface IProps {
    modelValue: any;
    title: string;
    boardId: number;
}

const emit = defineEmits(['close', 'cancel', 'onAdd'])
const props = defineProps<IProps>()
const title = ref(props.title);
const boardId = computed(() => props.boardId);
const $q = useQuasar();
const taskService = TaskService();

async function handleAddTask(formValues: TaskFormDTO, resetForm: () => void) {
    await addTask(formValues);
    emit('close');
    resetForm();
}

async function addTask(formValues: TaskFormDTO) {
  const task = {
    name: formValues.name,
    description: formValues.description,
  }

  const taskCreated = await taskService.createTask(task, boardId.value);

  if (taskCreated) {
    $q.notify({
        message: 'Task created successfully!',
        type: 'positive',
        color: 'green-5',
        position: 'top-right'
    })
  } else {
    $q.notify({
        message: 'Internal server error!',
        type: 'negative',
        color: 'red-5',
        position: 'top-right'
    });
  }
}
</script>