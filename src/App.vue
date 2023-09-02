<template>
  <div v-for="board in boards">
    {{ board.name }}
    <Container 
      group-name="kanboard" 
      @drag-start="handleDragStart(board.id, $event)" 
      @drop="handleDrop(board.id, $event)"
      :get-child-payload="getChildPayload"
      :drop-placeholder="{ className: 'placeholder' }"
    >            
      <Draggable v-for="task in board.tasks" :key="task.id">
        <div>
            {{task.id}} -> {{task.name}}
        </div>
      </Draggable>
    </Container>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Container, Draggable } from "vue3-smooth-dnd";

const boards = ref([
	{
		"id": 2,
		"created_at": "2023-09-02T05:13:15.000Z",
		"updated_at": "2023-09-02T05:33:52.000Z",
		"name": "Board 1",
		"tasks": [
			{
				"id": 4,
				"created_at": "2023-09-02T17:28:07.000Z",
				"updated_at": "2023-09-02T17:28:07.000Z",
				"name": "Task 1 - Board 1",
				"description": "",
				"boardId": 2
			},
			{
				"id": 3,
				"created_at": "2023-09-02T17:25:47.000Z",
				"updated_at": "2023-09-02T17:28:33.000Z",
				"name": "Task 1 - Board 1",
				"description": null,
				"boardId": 2
			}
		]
	},
	{
		"id": 3,
		"created_at": "2023-09-02T05:40:24.000Z",
		"updated_at": "2023-09-02T05:40:24.000Z",
		"name": "Board 2",
		"tasks": [
    {
				"id": 5,
				"created_at": "2023-09-02T17:28:07.000Z",
				"updated_at": "2023-09-02T17:28:07.000Z",
				"name": "Task 1 - Board 2",
				"description": "",
				"boardId": 3
			},
			{
				"id": 6,
				"created_at": "2023-09-02T17:25:47.000Z",
				"updated_at": "2023-09-02T17:28:33.000Z",
				"name": "Task 1 - Board 2",
				"description": null,
				"boardId": 3
			}
    ]
	}
]);
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

function getChildPayload(index) {
  return {
    index
  }
}
</script>
<style scoped>
.placeholder {
  background: rgba(0, 0, 0);
  border-radius: 0.4rem;
}
</style>

