export type QueueJobType = 'completed' | 'waiting' | 'active' | 'delayed' | 'failed'| 'paused';

export interface QueueManagerQueue {
    id: string;
    prefix: string;
    name: string;
    waitingJobs: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
    delayedJobs: number;
    pausedJobs: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface QueueManagerCreateQueue {
    id: string;
    prefix: string;
    name: string;
    waitingJobs: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
    delayedJobs: number;
    pausedJobs: number;
}

export interface QueueManagerUpdateQueueById {
    id: string;
    prefix?: string;
    name?: string;
    waitingJobs?: number;
    activeJobs?: number;
    completedJobs?: number;
    failedJobs?: number;
    delayedJobs?: number;
    pausedJobs?: number;
}

export interface QueueManagerUpdateQueues {
    id?: string;
    prefix?: string;
    name?: string;
    waitingJobs?: number;
    activeJobs?: number;
    completedJobs?: number;
    failedJobs?: number;
    delayedJobs?: number;
    pausedJobs?: number;
}

export interface QueueManagerJob {
    id: string;
    name: string;
    data: any;
    opts: any;
    progress: number;
    delay: number;
    timestamp: number;
    attemptsMode: number;
    failedReason?: string;
    stacktrace: string[];
    returnvalue?: any;
    finishedOn?: number;
    processedOn: number;
}

export interface QueueManagerJobRegistry {
    id: string;
    queueName: string;
    jobId: string;
    jobName: string;
    tags?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface QueueManagerCreateJobRegistry {
    id: string;
    queueName: string;
    jobId: number;
    jobName: string;
    tags?: any;
}

export interface QueueManagerUpdateJobRegistryById {
    id: string;
    queueName?: string;
    jobId?: number;
    jobName?: string;
    tags?: any;
}

export interface QueueManagerUpdateJobsRegistry {
    id?: string;
    queueName?: string;
    jobId?: number;
    jobName?: string;
    tags?: any;
}

export enum QueueManagerJobState {
    COMPLETED = 'COMPLETED',
    WAITING = 'WAITING',
    ACTIVE = 'ACTIVE',
    DELAYED = 'DELAYED',
    FAILED = 'FAILED',
    PAUSED = 'PAUSED'
}
