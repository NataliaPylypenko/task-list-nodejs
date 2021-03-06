
export interface TaskInterface {
    id: string,
    name: string,
    created: string,
    content: string,
    category: string,
    status: string
}

export type statusType = {
    ACTIVE: string,
    ARCHIVE: string,
}

export interface TaskInterfaceSummary {
    category: string,
    active: number,
    archived: number
}