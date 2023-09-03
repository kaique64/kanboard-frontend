import TaskStore from "../store/TaskStore";
import { TaskFormDTO } from "../types/dtos/TaskFormDTO";
import BoardStore from "../../board/store/BoardStore";

export const TaskService = () => {
    const taskStore = TaskStore();
    const boardStore = BoardStore();

    async function createTask(taskDTO: TaskFormDTO, boardId: number) {
        taskStore.setLoading(true);
        boardStore.setLoading(true);
        
        const task = await taskStore.createTask(taskDTO, boardId);
        await boardStore.fetchBoard();
        
        boardStore.setLoading(false);
        taskStore.setLoading(false);
        
        return task;
    }

    async function updateTask(taskDTO: TaskFormDTO, taskId: number, boardId: number) {
        taskStore.setLoading(true);
        boardStore.setLoading(true);
        
        const task = await taskStore.updateTask(taskDTO, taskId, boardId);
        await boardStore.fetchBoard();

        boardStore.setLoading(false);
        taskStore.setLoading(false);
        
        return task;
    }

    return {
        createTask,
        updateTask
    }
}