import { ref } from "vue";
import { RestService } from "../../../common/service/integration/RestService";
import { defineStore } from "pinia";
import { TaskDTO } from "../types/dtos/TaskDTO";
import { TaskCreateDTO } from "../types/dtos/TaskCreateDTO";

const TaskStore = defineStore('TaskStore', () => {
    const restService = new RestService();
    const loading = ref(false);

    const setLoading = (loadingValue: boolean) => loading.value = loadingValue;
    const getLoading = () => loading.value;

    async function createTask(taskDTO: TaskCreateDTO, boardId: number) {
        const task = await restService.executePost<TaskDTO, TaskCreateDTO>({
            url: `/task?boardId=${boardId}`,
            payload: taskDTO
        });

        return task
    }

    return {
        createTask,
        setLoading,
        getLoading
    }
});

export default TaskStore;