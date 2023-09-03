<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="75vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <TaskForm @cancel="$emit('cancel')" @submit="handleAddTask" />
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
import { TaskCreateDTO } from '../../task/types/dtos/TaskCreateDTO';

interface IProps {
    modelValue: any;
    title: string;
    boardId: number;
}

const emit = defineEmits(['close', 'cancel', 'onAdd'])
const props = defineProps<IProps>()
const title = ref(props.title);
const boardId = ref(props.boardId);
const $q = useQuasar();
const taskService = TaskService();

async function handleAddTask(formValues: TaskCreateDTO) {
    await addTask(formValues);
    emit('close');
}

async function addTask(formValues: TaskCreateDTO) {
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
  }
}

</script>