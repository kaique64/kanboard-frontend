import { TPayload } from "../TPayload";

export interface DropResultDTO {
    addedIndex: number | null;
    payload: TPayload;
    removedIndex: number | null;
}