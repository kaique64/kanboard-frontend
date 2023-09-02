<template>
  <div class="row justify-center items-start full-width">
    <Kanban 
      group-name="kanboard" 
      :boards="boards"
    />
  </div>
</template>
<script setup lang="ts">
import Kanban from './modules/kanban/component/Kanban.vue'

const boards = [
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
				"description": "Task 1 - Board 1 Description",
				"boardId": 2
			},
			{
				"id": 3,
				"created_at": "2023-09-02T17:25:47.000Z",
				"updated_at": "2023-09-02T17:28:33.000Z",
				"name": "Task 2 - Board 1",
				"description": "Task 2 - Board 1 Description",
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
				"description": 'Task 1 - Board 2 Description',
				"boardId": 3
			},
			{
				"id": 6,
				"created_at": "2023-09-02T17:25:47.000Z",
				"updated_at": "2023-09-02T17:28:33.000Z",
				"name": "Task 1 - Board 2",
				"description": 'Task 2 - Board 2 Description',
				"boardId": 3
			}
    ]
	}
];
</script>
<style scoped>
.placeholder {
  background: rgba(0, 0, 0);
  border-radius: 0.4rem;
}
</style>

