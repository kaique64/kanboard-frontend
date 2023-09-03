import TaskStore from "../store/TaskStore";
import { TaskCreateDTO } from "../types/dtos/TaskCreateDTO";

export const TaskService = () => {
    const taskStore = TaskStore();

    async function createTask(taskDTO: TaskCreateDTO, boardId: number) {
        taskStore.setLoading(true);
        
        const task = await taskStore.createTask(taskDTO, boardId);
        
        taskStore.setLoading(false);
        
        return task;
    }

    return {
        createTask
    }
}