import { TPayload } from "../TPayload";

export interface DragResultDTO {
    isSource: boolean;
    payload: TPayload;
    wiilAcceptDrop: boolean;
}