import TaskStore from "../store/TaskStore";
import { TaskFormDTO } from "../types/dtos/TaskFormDTO";

export const TaskService = () => {
    const taskStore = TaskStore();

    async function createTask(taskDTO: TaskFormDTO, boardId: number) {
        taskStore.setLoading(true);
        
        const task = await taskStore.createTask(taskDTO, boardId);
        
        taskStore.setLoading(false);
        
        return task;
    }

    async function updateTask(taskDTO: TaskFormDTO, taskId: number, boardId: number) {
        taskStore.setLoading(true);
        
        const task = await taskStore.updateTask(taskDTO, taskId, boardId);
        
        taskStore.setLoading(false);
        
        return task;
    }

    return {
        createTask,
        updateTask
    }
}