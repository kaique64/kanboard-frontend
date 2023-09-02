export interface TaskDTO {
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description?: string,
    boardId: number
}