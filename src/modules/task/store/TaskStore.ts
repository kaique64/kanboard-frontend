import { ref } from "vue";
import { RestService } from "../../../common/service/integration/RestService";
import { defineStore } from "pinia";
import { TaskDTO } from "../types/dtos/TaskDTO";
import { TaskFormDTO } from "../types/dtos/TaskFormDTO";

const TaskStore = defineStore('TaskStore', () => {
    const restService = new RestService();
    const loading = ref(false);

    const setLoading = (loadingValue: boolean) => loading.value = loadingValue;
    const getLoading = () => loading.value;

    async function createTask(taskDTO: TaskFormDTO, boardId: number) {
        const task = await restService.executePost<TaskDTO, TaskFormDTO>({
            url: `/task?boardId=${boardId}`,
            payload: taskDTO
        });

        return task
    }

    async function updateTask(taskDTO: TaskFormDTO, taskId: number, boardId: number) {
        const task = await restService.executePut<TaskDTO, TaskFormDTO>({
            url: `/task/${taskId}?boardId=${boardId}`,
            payload: taskDTO
        });

        return task
    }

    return {
        createTask,
        updateTask,
        setLoading,
        getLoading
    }
});

export default TaskStore;