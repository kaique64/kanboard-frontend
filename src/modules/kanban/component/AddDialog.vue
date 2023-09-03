<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="75vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <q-form @submit="handleAddTask">
                    <q-input 
                        v-model="form.name" 
                        class="q-mx-md q-my-md" 
                        label="Name" 
                        dense
                        filled
                        outlined
                        hide-bottom-space
                        :rules="[(val) => (val && val.length > 0) || 'Name must be filled in.']"
                    />
                    <q-input 
                        v-model="form.description" 
                        class=" q-mx-md q-my-sm" 
                        type="textarea" 
                        label="Description" 
                        dense
                        filled 
                        outlined
                        style="max-height: 15rem;"
                        :input-style="{ resize: 'none', height: '75px' }"
                    />
                    <div class="row justify-end q-mx-md q-my-md">
                        <Button 
                            id="submit-btn" 
                            color="primary" 
                            class="q-mr-sm" 
                            flat 
                            label="Add" 
                            type="submit"
                            :loading="taskFormIsLoading"
                        ></Button>
                        <Button 
                            v-if="!taskFormIsLoading" 
                            id="submit-btn"
                            color="primary" 
                            flat 
                            label="Cancel" 
                            @click="$emit('cancel', resetForm)"
                        ></Button>
                    </div>
                </q-form>
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import Button from '../../../common/component/button/Button.vue';
import { TaskService } from '../../task/service/TaskService';
import { useQuasar } from 'quasar';
import TaskStore from '../../task/store/TaskStore';

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
const taskStore = TaskStore();
const taskService = TaskService();
const taskFormIsLoading = computed(() => taskStore.getLoading());
const form = ref({
    name: '',
    description: '',
})

async function handleAddTask() {
    await addTask();
    resetForm();
    emit('close');
}

async function addTask() {
  const task = {
    name: form.value.name,
    description: form.value.description,
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

function resetForm() {
    for (const formKey in form.value) {
        form.value[formKey] = '';
    }
}

</script>