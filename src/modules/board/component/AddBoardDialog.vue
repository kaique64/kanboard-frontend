<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="40vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <BoardForm 
                    @cancel="$emit('cancel')" 
                    @submit="handleAddTask" 
                    submit-button-label="Add"
                />
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import { BoardFormDTO } from '../types/dtos/BoardFormDTO';
import BoardForm from './/BoardForm.vue';
import { BoardService } from '../service/BoardService';
import { NotifyService } from '../../../common/service/NotifyService';

interface IProps {
    modelValue: any;
    title: string;
}

const emit = defineEmits(['close', 'cancel', 'onAdd']);
const props = defineProps<IProps>();
const boardService = BoardService();
const notifyService = NotifyService();

async function handleAddTask(formValues: BoardFormDTO, resetForm: () => void) {
    await addTask(formValues);
    emit('close');
    resetForm();
}

async function addTask(formValues: BoardFormDTO) {
  const board = {
    name: formValues.name,
  }

  const boardCreated = await boardService.createBoard(board);

  if (boardCreated) {
    notifyService.showSuccessMessage('Board created successfully');
  } else {
    notifyService.showErrorMessage('Internal server error!');
  }
}
</script>