import { Ref, ref } from "vue";
import { defineStore } from "pinia";
import { BoardDTO } from "../types/dtos/BoardDTO";
import { RestService } from "../../../common/service/integration/RestService";
import { BoardFormDTO } from "../types/dtos/BoardFormDTO";
import { NotifyService } from "../../../common/service/NotifyService";

const BoardStore = defineStore('BoardStore', () => {
    const restService = new RestService();
    const notifyService = NotifyService();
    const boards: Ref<BoardDTO[]> = ref([]);
    const loading = ref(false);

    const setBoards = (boardsDTO: BoardDTO[]) => boards.value = boardsDTO;
    const getBoards = () => boards.value;

    const setLoading = (loadingValue: boolean) => loading.value = loadingValue;
    const getLoading = () => loading.value;

    async function createBoard(boardDTO: BoardFormDTO): Promise<BoardDTO | null> {
        const board: BoardDTO | null = await restService.executePost<BoardDTO, BoardFormDTO>({
            url: '/board',
            payload: boardDTO,
        });

        return board;
    }

    async function updateBoard(id: number, boardDTO: BoardFormDTO): Promise<BoardDTO | null> {
        const board: BoardDTO | null = await restService.executePut<BoardDTO, BoardFormDTO>({
            url: `/board/${id}`,
            payload: boardDTO,
        });

        return board;
    }

    async function deleteBoard(id: number): Promise<BoardDTO | null> {
        const board: BoardDTO | null = await restService.executeDelete<BoardDTO>({
            url: `/board/${id}`
        });

        return board;
    }

    async function fetchBoard() {
        const boardsData: BoardDTO[] | null = await restService.executeGet<BoardDTO[]>({
            url: `/board`
        });
        
        if (boardsData) {
            setBoards(boardsData);
        } else {
            notifyService.showErrorMessage('Sorry about it, we are having server instability!');
        }
    }

    return {
        fetchBoard,
        createBoard,
        updateBoard,
        deleteBoard,
        setBoards,
        getBoards,
        setLoading,
        getLoading
    }
});

export default BoardStore;