import KanbanStore from '../../kanban/store/KanbanStore';

export function KanbanService() {
    const kanbanStore = KanbanStore();

    async function updateTaskBoard(taskId: number, boardId: number) {
        const task = await kanbanStore.updateTaskBoard(taskId, boardId);
    
        return task
    }

    return {
        updateTaskBoard,
    }
}