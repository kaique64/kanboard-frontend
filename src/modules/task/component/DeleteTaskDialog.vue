<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="40vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <div class="column q-px-md q-mt-md">
                    <span class="text-bold text-subtitle1">Are you will delete this task?</span>
                    <span class="text-body">If you delete this task you need task insert it again.</span>
                </div>
                <div class="row justify-end q-mx-md q-my-md">
                    <Button 
                        id="submit-btn" 
                        color="primary" 
                        class="q-mr-sm" 
                        flat 
                        label="Delete" 
                        type="submit"
                        :loading="taskIsLoading"
                        @click="handleDeleteTask"
                    ></Button>
                    <Button 
                        v-if="!taskIsLoading" 
                        id="submit-btn"
                        color="primary" 
                        flat 
                        label="Cancel" 
                        @click="$emit('cancel')"
                    ></Button>
                </div>
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import { TaskService } from '../../task/service/TaskService';
import Button from '../../../common/component/button/Button.vue';
import TaskStore from '../store/TaskStore';
import { NotifyService } from '../../../common/service/NotifyService';

interface IProps {
    modelValue: any;
    title: string;
    taskId: number;
}

const emit = defineEmits(['close', 'cancel'])
const props = defineProps<IProps>();
const title = ref(props.title);
const taskId = ref(props.taskId);
const taskStore = TaskStore();
const taskIsLoading = computed(() => taskStore.getLoading());
const taskService = TaskService();
const notifyService = NotifyService();

async function handleDeleteTask() {
    await deleteTask();
    emit('close');
}

async function deleteTask() {
  const taskDeleted = await taskService.deleteTask(taskId.value);

  if (taskDeleted) {
    notifyService.showSuccessMessage('Task deleted successfully');
  } else {
    notifyService.showErrorMessage('Internal server error!');
  }
}

</script>