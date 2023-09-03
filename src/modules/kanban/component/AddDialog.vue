<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate class="text-capitalize" height="50vh" width="75vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <q-form @submit="addTask">
                    <q-input 
                        v-model="form.name" 
                        class="q-mx-md q-my-md" 
                        label="Name" 
                        dense
                        filled
                        outlined
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
                        <Button id="submit-btn" color="primary" class="q-mr-sm" flat label="Add" @click="handleAddTask"></Button>
                        <Button id="submit-btn" color="primary" flat label="Cancel" @click="$emit('cancel', resetForm)"></Button>
                    </div>
                </q-form>
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import Button from '../../../common/component/button/Button.vue';

interface IProps {
    modelValue: any;
    title: string;
    boardId: number;
}

const emit = defineEmits(['close', 'cancel', 'onAdd'])
const props = defineProps<IProps>()
const title = ref(props.title);
const boardId = ref(props.boardId);
const form = ref({
    name: '',
    description: '',
})

async function handleAddTask() {
    await addTask();
    emit('cancel', resetForm);
}

async function addTask() {
  const task = {
    name: form.value.name,
    description: form.value.description,
    boardId: boardId.value
  }
}

function resetForm() {
    for (const formKey in form.value) {
        form.value[formKey] = '';
    }
}

</script>