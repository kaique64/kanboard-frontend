import BoardStore from "../store/BoardStore";
import { BoardFormDTO } from "../types/dtos/BoardFormDTO";

export function BoardService() {
    const boardStore = BoardStore();

    async function createBoard(boardDTO: BoardFormDTO) {
        boardStore.setLoading(true);
        
        const board = await boardStore.createBoard(boardDTO);
        await boardStore.fetchBoard();
        
        boardStore.setLoading(false);

        return board;
    }

    async function updateBoard(id: number, boardDTO: BoardFormDTO) {
        boardStore.setLoading(true);
        
        const board = await boardStore.updateBoard(id, boardDTO);
        await boardStore.fetchBoard();
        
        boardStore.setLoading(false);

        return board;
    }

    async function deleteBoard(id: number) {
        boardStore.setLoading(true);
        
        const board = await boardStore.deleteBoard(id);
        await boardStore.fetchBoard();
        
        boardStore.setLoading(false);

        return board;
    }

    return {
        createBoard,
        updateBoard,
        deleteBoard
    }
}