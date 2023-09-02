import { TaskDTO } from "../../task/dtos/TaskDTO";

export interface BoardDTO {
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    tasks: TaskDTO[]
}