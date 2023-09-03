import { ref } from "vue";
import { defineStore } from "pinia";
import { TaskDTO } from "../../task/dtos/TaskDTO";
import { RestService } from "../../../common/service/integration/RestService";

const KanbanStore = defineStore('KanbanStore', () => {
    const restService = new RestService();
    const loading = ref(false);

    const setLoading = (loadingValue: boolean) => loading.value = loadingValue;
    const getLoading = () => loading.value;

    async function updateTaskBoard(taskId: number, boardId: number): Promise<TaskDTO | null> {
        const task: TaskDTO | null = await restService.executePatch<TaskDTO, number>({
            url: `/task/${taskId}?boardId=${boardId}`
        });
        
        return task;
    }

    return {
        updateTaskBoard,
        setLoading,
        getLoading
    }
});

export default KanbanStore;