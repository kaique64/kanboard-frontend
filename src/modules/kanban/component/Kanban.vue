<template>
  <div v-if="boardIsLoading" class="flex items-center justify-center full-width window-height loading">
    <q-spinner
      color="primary"
      size="3em"
    ></q-spinner>
  </div>
  <div v-else class="row items-start justify-center">
    <Board v-for="board in boards" :board="board" :key="board.id">
      <template #content>
        <Button
          id="action-button" 
          flat 
          color="grey-10"
          icon="mdi-dots-horizontal" 
        >
        <template #default>
            <q-menu anchor="top right" self="top left">
              <q-list style="min-width: 100px">
                <q-item 
                  v-close-popup 
                >
                  <Button
                    id="update-board-btn" 
                    flat
                    color="blue"
                    no-caps
                    size="md"
                    label="Update board"
                    icon="mdi-pencil-outline"
                    @click="() => {
                      boardSelected = board;
                      updateBoardDialog = true
                    }"
                  />
                </q-item>
                <q-item 
                  v-close-popup 
                >
                  <Button
                    id="delete-board-btn" 
                    flat
                    color="red"
                    size="md"
                    no-caps
                    label="Delete board"
                    icon="mdi-trash-can-outline"
                    @click="() => {
                      boardSelected = board;
                      deleteBoardDialog = true
                    }"
                  />
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip class="text-capitalize">Board actions</q-tooltip>
          </template>
        </Button>
        <div v-if="boardIsLoading" class="row items-center justify-center">
          <q-spinner 
            color="primary"
            size="3em"
          />
        </div>
        <Container 
          v-else  
          :group-name="groupName" 
          @drag-start="($event: any) => {
            changeToGrabbingCursor();
            dragAndDropService.handleDragStart(board.id, $event)
          }" 
          @drop="($event: any) => {
            changeToGrabCursor();
            dragAndDropService.handleDrop(board.id, $event)
          }"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'placeholder' }"
        >
          <Draggable v-for="task in board.tasks" :key="task.id">
            <Card class="q-my-sm rounded-borders">
              <template #content>
                  <Task :task="task" />
                </template>
            </Card>
          </Draggable>
        </Container>
      </template>
    </Board>
    <div class="q-ma-md" style="max-height: 25px;">
      <Button
        id="add-board-btn"
        label="Add new board"
        icon="mdi-plus"
        flat
        no-caps
        class="text-capitalize"
        color="grey-8" 
        @click="() => addBoardDialog = true"
      ></Button>
    </div>
  </div>
  <AddBoardDialog
    :model-value="addBoardDialog"
    :title="`Add board`"
    @close="() => addBoardDialog = false" 
    @cancel="() => addBoardDialog = false"
  />
  <UpdateBoardDialog 
    :model-value="updateBoardDialog" 
    :title="`Update board`"
    :board-form="boardSelected"
    @close="() => updateBoardDialog = false" 
    @cancel="() => updateBoardDialog = false"
  />
  <DeleteBoardDialog 
    :model-value="deleteBoardDialog" 
    :title="`Delete board`"
    :board-id="boardSelected.id"
    @close="() => deleteBoardDialog = false" 
    @cancel="() => deleteBoardDialog = false"
  />
</template>

<script setup lang="ts">
import { Ref, ref, onBeforeMount, computed } from 'vue';
import { Container, Draggable } from "vue3-smooth-dnd";
import { DragAndDropService } from '../service/DragAndDropService'
import Board from '../../board/component/Board.vue'
import Card from '../../../common/component/card/Card.vue'
import BoardStore from '../../board/store/BoardStore';
import Task from '../../task/component/Task.vue'
import Button from '../../../common/component/button/Button.vue';
import AddBoardDialog from '../../board/component/AddBoardDialog.vue';
import UpdateBoardDialog from '../../board/component/UpdateBoardDialog.vue';
import DeleteBoardDialog from '../../board/component/DeleteBoardDialog.vue';
import { BoardDTO } from '../../board/types/dtos/BoardDTO';

interface IProps {
    groupName: string;
}

const props = defineProps<IProps>();
const groupName = ref(props.groupName);
const boardStore = BoardStore();
const boards = computed(() => boardStore.getBoards());
const boardIsLoading = computed(() => boardStore.getLoading());
const dragAndDropService = DragAndDropService();
const addBoardDialog = ref(false);
const updateBoardDialog = ref(false);
const deleteBoardDialog = ref(false);
const boardSelected: Ref<BoardDTO> = ref({
    id: 0,
    created_at: new Date(),
    updated_at: new Date(),
    name: '',
    tasks: []
});

function getChildPayload(index: number) {
  return {
    index
  }
}

function changeToGrabbingCursor() {
  const className = 'grabbing';
  const html = document.getElementsByTagName('html').item(0);
  if (html && new RegExp(className).test(html.className) === false) {
      html.className += ' ' + className; // use a space in case there are other classNames
  }
}

function changeToGrabCursor() {
  const className = 'grabbing';
  const html = document.getElementsByTagName('html').item(0);
  if (html && new RegExp(className).test(html.className) === true) {
      // Remove className with the added space (from setClassToHTMLElement)
      html.className = html.className.replace(
          new RegExp(' ' + className),
          ''
      );
      // Remove className without added space (just in case)
      html.className = html.className.replace(new RegExp(className), '');
  }
}


onBeforeMount(async () => {
	boardStore.getBoards().length === 0 && await boardStore.fetchBoard();
});
</script>
