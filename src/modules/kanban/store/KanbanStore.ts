import { defineStore } from "pinia";
import { TaskDTO } from "../../task/dtos/TaskDTO";
import { RestService } from "../../../common/service/integration/RestService";

const KanbanStore = defineStore('KanbanStore', () => {
    const restService = new RestService();

    async function updateTaskBoard(taskId: number, boardId: number): Promise<TaskDTO | null> {
        const task: TaskDTO | null = await restService.executePatch<TaskDTO, number>({
            url: `/task/${taskId}?boardId=${boardId}`
        });
        
        return task;
    }

    return {
        updateTaskBoard
    }
});

export default KanbanStore;