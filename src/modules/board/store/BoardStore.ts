import { Ref, ref } from "vue";
import { defineStore } from "pinia";
import { BoardDTO } from "../types/dtos/BoardDTO";
import { RestService } from "../../../common/service/integration/RestService";

const BoardStore = defineStore('BoardStore', () => {
    const restService = new RestService();
    const boards: Ref<BoardDTO[]> = ref([]);
    const loading = ref(false);

    const setBoards = (boardsDTO: BoardDTO[]) => boards.value = boardsDTO;
    const getBoards = () => boards.value;

    const setLoading = (loadingValue: boolean) => loading.value = loadingValue;
    const getLoading = () => loading.value;

    async function fetchBoard() {
        const boardsData: BoardDTO[] | null = await restService.executeGet<BoardDTO[]>({
            url: `/board`
        });
        
        if (boardsData) {
            setBoards(boardsData);
        }
    }

    return {
        fetchBoard,
        setBoards,
        getBoards,
        setLoading,
        getLoading
    }
});

export default BoardStore;