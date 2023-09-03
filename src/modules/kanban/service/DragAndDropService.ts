import { ref, computed } from 'vue';
import BoardStore from '../../board/store/BoardStore';
import KanbanStore from '../../kanban/store/KanbanStore';
import { TaskDTO } from '../../task/dtos/TaskDTO';
import { DragResultDTO } from '../types/dtos/DragResultDTO';

export function DragAndDropService() {
    const boardStore = BoardStore();
    const kanbanStore = KanbanStore();
    const boards = computed(() => boardStore.getBoards());
    const draggingCard = ref({
        boardId: -1,
        index: -1,
        data: {} as TaskDTO
    });
  
    function handleDragStart(boardId: number, dragResult: DragResultDTO) {
        const { payload, isSource } = dragResult;
    
        if (isSource) {
            draggingCard.value = {
                boardId,
                index: payload.index,
                data: {
                    ...boards.value.find(i => i.id === boardId)?.tasks[payload.index] as TaskDTO
                }
            }
        }
    }
    
    async function handleDrop(boardId: number, dropResult: any) {
        kanbanStore.setLoading(true);
        const { removedIndex, addedIndex } = dropResult;
    
        if (boardId === draggingCard.value.boardId && removedIndex === addedIndex) {
            return;
        }
        
        if (removedIndex !== null) {
            boards.value.find((i) => i.id === boardId)?.tasks.splice(removedIndex, 1);
        }
        
        if (addedIndex !== null) {
            boards.value.find((i) => i.id === boardId)?.tasks.splice(addedIndex, 0, draggingCard.value.data);
            await kanbanStore.updateTaskBoard(draggingCard.value.data.id, boardId);
        }
        
        kanbanStore.setLoading(false);
    }

    return {
        handleDragStart,
        handleDrop
    }
}