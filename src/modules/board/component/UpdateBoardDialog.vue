<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="40vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <BoardForm 
                    :board-form="boardForm"
                    @cancel="$emit('cancel')" 
                    @submit="(form, resetForm) => {
                        handleUpdateTask(form, form.id, resetForm);
                    }" 
                    submit-button-label="Update"
                />
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import { BoardFormDTO } from '../types/dtos/BoardFormDTO';
import BoardForm from './/BoardForm.vue';
import { BoardService } from '../service/BoardService';
import { BoardDTO } from '../types/dtos/BoardDTO';
import { NotifyService } from '../../../common/service/NotifyService';

interface IProps {
    modelValue: any;
    title: string;
    boardForm: BoardDTO;
}

const emit = defineEmits(['close', 'cancel', 'onAdd']);
const props = defineProps<IProps>();
const boardForm = computed(() => props.boardForm);
const boardService = BoardService();
const notifyService = NotifyService();

async function handleUpdateTask(formValues: BoardFormDTO, baordId: number, resetForm: () => void) {
    await updateTask(formValues, baordId);
    emit('close');
    resetForm();
}

async function updateTask(formValues: BoardFormDTO, baordId: number) {
  const board = {
    name: formValues.name,
  }

  const boardCreated = await boardService.updateBoard(baordId, board);

  if (boardCreated) {
    notifyService.showSuccessMessage('Board updated successfully');
  } else {
    notifyService.showErrorMessage('Internal server error!');
  }
}
</script>