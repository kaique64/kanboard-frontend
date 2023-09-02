import { ref, computed } from 'vue';
import BoardStore from '../../board/store/BoardStore';

export function DragAndDropService() {
    const draggingCard = ref({
        boardId: -1,
        index: -1,
        data: {}
    });
    const boardStore = BoardStore();
    const boards = computed(() => boardStore.getBoards());
  
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
    return {
        handleDragStart,
        handleDrop
    }
}