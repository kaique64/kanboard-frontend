<template>
    <Board v-for="board in boards" :board="board" :key="board.id">
      <template #content>
        <div v-if="boardIsLoading" class="row items-center justify-center">
          <q-spinner 
            color="primary"
            size="3em"
          />
        </div>
        <Container 
          v-else  
          :group-name="groupName" 
          @drag-start="dragAndDropService.handleDragStart(board.id, $event)" 
          @drop="dragAndDropService.handleDrop(board.id, $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="task in board.tasks" :key="task.id">
            <Card class="q-my-sm rounded-borders" style="background-color: rgb(234, 234, 234);">
                <template #content>
                  <Task :task="task" />
                </template>
            </Card>
          </Draggable>
        </Container>
      </template>
    </Board>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { Container, Draggable } from "vue3-smooth-dnd";
import { DragAndDropService } from '../service/DragAndDropService'
import Board from '../../board/component/Board.vue'
import Card from '../../../common/component/card/Card.vue'
import BoardStore from '../../board/store/BoardStore';
import Task from '../../task/component/Task.vue'

interface IProps {
    groupName: string;
}

const props = defineProps<IProps>();
const groupName = ref(props.groupName);
const boardStore = BoardStore();
const boards = computed(() => boardStore.getBoards());
const boardIsLoading = computed(() => boardStore.getLoading());
const dragAndDropService = DragAndDropService();

function getChildPayload(index: number) {
  return {
    index
  }
}

onBeforeMount(async () => {
	boardStore.getBoards().length === 0 && await boardStore.fetchBoard();
});
</script>
