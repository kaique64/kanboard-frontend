<template>
	<q-layout view="hHh LPR lFf" style="min-height: 60vh;">
		<Header />
		<div v-if="kanbanIsLoading" class="flex items-center justify-center full-width window-height loading">
			<q-spinner
				color="primary"
				size="3em"
			></q-spinner>
		</div>
		<div class="row justify-center items-center full-width window-height">
			<Kanban group-name="kanboard" />
		</div>
	</q-layout>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import Kanban from './modules/kanban/component/Kanban.vue';
import KanbanStore from './modules/kanban/store/KanbanStore';
import Header from './common/component/header/Header.vue';

const kanbanStore = KanbanStore();
const kanbanIsLoading = computed(() => kanbanStore.getLoading());

watch(kanbanIsLoading, (newValue) => {
	kanbanStore.setLoading(newValue);
})
</script>

<style scoped>
.loading {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 11111;
	background: rgba(0, 0, 0, 0.3);
}
</style>

