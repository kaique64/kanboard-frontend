<template>
    <q-card 
        class="q-ma-md q-pa-md" 
        style="min-width: 26.5rem; background-color: rgb(234, 234, 234);"
    >
        <div class="row justify-between">
            <span class="text-bold text-h6">{{ board.name }}</span>
        </div>
        <slot name="content"></slot>
        <Button 
            id="action-button" 
            flat 
            no-caps
            label="Add new task"
            color="grey-8" 
            icon="mdi-plus" 
            @click="openAddTaskDialog"
        />
    </q-card>
    <AddTaskDialog 
        :model-value="addTaskDialog" 
        :title="`Add task`"
        @close="closeAddTaskDialog" 
        @cancel="closeAddTaskDialog"
        :board-id="board.id"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../../../common/component/button/Button.vue';
import AddTaskDialog from '../../task/component/AddTaskDialog.vue';
import { BoardDTO } from '../types/dtos/BoardDTO';

interface IProps {
    board: BoardDTO;
}

const props = defineProps<IProps>();
const board = ref(props.board);
const addTaskDialog = ref(false);

function openAddTaskDialog() {
  addTaskDialog.value = true;
}

function closeAddTaskDialog() {
  addTaskDialog.value = false;
}
</script>
