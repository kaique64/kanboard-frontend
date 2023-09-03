<template>
    <q-card 
        class="q-ma-md q-pa-md" 
        style="min-width: 23rem;"
    >
        <div class="row justify-between">
            <span class="text-bold text-h6">{{ board.name }}</span>
            <div>
                <Button 
                    id="action-button" 
                    flat 
                    color="blue" 
                    icon="mdi-plus" 
                    @click="openAddTaskDialog"
                >
                    <template #default>
                        <q-tooltip>Add task</q-tooltip>
                    </template>
                </Button>
            </div>
        </div>
        <slot name="content"></slot>
    </q-card>
    <AddDialog 
        :model-value="addDialog" 
        :title="`Add task`"
        @close="closeAddTaskDialog" 
        @cancel="(resetForm: () => void) => {
            closeAddTaskDialog();
            resetForm();
        }"
        :board-id="board.id"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../../../common/component/button/Button.vue';
import AddDialog from '../../kanban/component/AddDialog.vue';
import { BoardDTO } from '../types/dtos/BoardDTO';

interface IProps {
    board: BoardDTO;
}

const props = defineProps<IProps>();
const board = ref(props.board);
const addDialog = ref(false);

function openAddTaskDialog() {
  addDialog.value = true;
}

function closeAddTaskDialog() {
  addDialog.value = false;
}
</script>
