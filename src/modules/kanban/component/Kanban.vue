<template>
    <Board v-for="board in boards" :name="board.name" :key="board.id">
      <template #content>
        <Container 
          :group-name="groupName" 
          @drag-start="handleDragStart(board.id, $event)" 
          @drop="handleDrop(board.id, $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="task in board.tasks" :key="task.id">
            <Card class="q-my-sm rounded-borders" style="background-color: rgb(234, 234, 234);">
                <template #content>
                  <Task :name="task.name" :description="task.description" />
                </template>
            </Card>
          </Draggable>
        </Container>
      </template>
    </Board>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BoardDTO } from "../../board/dtos/BoardDTO";
import Board from '../../board/component/Board.vue'
import Card from '../../../common/component/card/Card.vue'
import Task from '../../task/component/Task.vue'
import { Container, Draggable } from "vue3-smooth-dnd";

interface IProps {
    groupName: string;
    boards: BoardDTO[];
}

const props = defineProps<IProps>();
const groupName = ref(props.groupName);
const boards = ref(props.boards);

const draggingCard = ref({
  boardId: -1,
  index: -1,
  data: {}
});

function handleDragStart(boardId: number, dragResult) {
  const { payload, isSource } = dragResult;

  if (isSource) {
    draggingCard.value = {
      boardId,
      index: payload.index,
      data: {
        ...boards.value.find(i => i.id === boardId)?.tasks[payload.index]
      }
    }
  }
}

function handleDrop(boardId: number, dropResult) {
  const { removedIndex, addedIndex } = dropResult;

  if (boardId === draggingCard.value.boardId && removedIndex === addedIndex) {
    return;
  }

  if (removedIndex !== null) {
    boards.value.find((i) => i.id === boardId)?.tasks.splice(removedIndex, 1);
  }

  if (addedIndex !== null) {
    boards.value.find((i) => i.id === boardId)?.tasks.splice(addedIndex, 0, draggingCard.value.data);
  }
}


function getChildPayload(index: number) {
  return {
    index
  }
}
</script>
../../task/dtos/BoardDTO