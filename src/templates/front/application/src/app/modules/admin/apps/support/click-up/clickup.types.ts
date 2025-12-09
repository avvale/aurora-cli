export interface ClickupSpace {
    id: string;
    name?: string;
    color?: string;
    private?: boolean;
    avatar?: string;
    admin_can_manage?: boolean;
}

export interface ClickupFolder {
    id: string;
    name?: string;
    orderindex?: number;
    content?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    task_count?: number;
    due_date?: string;
    start_date?: string;
    archived?: boolean;
    override_statuses?: boolean;
}

export interface ClickupList {
    id: string;
    name?: string;
    orderindex?: number;
    content?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    task_count?: number;
    due_date?: string;
    start_date?: string;
    archived?: boolean;
    override_statuses?: boolean;
}
