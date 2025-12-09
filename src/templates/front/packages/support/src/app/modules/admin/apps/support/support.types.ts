import { IamAccount } from '@apps/iam';

export interface SupportIssue {
    id: string;
    externalId?: string;
    externalStatus?: string;
    accountId?: string;
    account?: IamAccount;
    accountUsername?: string;
    frontVersion?: string;
    backVersion?: string;
    environment?: string;
    subject: string;
    description: string;
    attachments?: any;
    screenRecording?: any;
    comments?: SupportComment[];
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface SupportCreateIssue {
    id: string;
    externalId?: string;
    externalStatus?: string;
    accountId?: string;
    accountUsername?: string;
    frontVersion?: string;
    backVersion?: string;
    environment?: string;
    subject: string;
    description: string;
    attachments?: any;
    video?: any;
    meta?: any;
}

export interface SupportUpdateIssueById {
    id: string;
    externalId?: string;
    externalStatus?: string;
    accountId?: string;
    accountUsername?: string;
    frontVersion?: string;
    backVersion?: string;
    environment?: string;
    subject?: string;
    description?: string;
    attachments?: any;
    video?: any;
    meta?: any;
}

export interface SupportUpdateIssues {
    id?: string;
    externalId?: string;
    externalStatus?: string;
    accountId?: string;
    accountUsername?: string;
    frontVersion?: string;
    backVersion?: string;
    environment?: string;
    subject?: string;
    description?: string;
    attachments?: any;
    video?: any;
    meta?: any;
}

export type SupportIssueRecordingState =
    | 'idle'
    | 'recording'
    | 'paused'
    | 'recorded';
export type SupportIssueDisplaySurface = 'tab' | 'window' | 'screen' | 'any';

export interface SupportConfig {
    id: string;
    rowId: number;
    apiKey?: string;
    listId?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface SupportCreateConfig {
    id: string;
    rowId: number;
    apiKey?: string;
    listId?: string;
}

export interface SupportUpdateConfigById {
    id: string;
    rowId?: number;
    apiKey?: string;
    listId?: string;
}

export interface SupportUpdateConfigs {
    id?: string;
    rowId?: number;
    apiKey?: string;
    listId?: string;
}

export interface SupportComment {
    id: string;
    rowId?: number;
    issueId?: string;
    issue?: SupportIssue;
    externalId?: string;
    description: string;
    attachments?: any;
    screenRecording?: any;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface SupportCreateComment {
    id: string;
    rowId: number;
    issueId?: string;
    externalId?: string;
    description: string;
    attachments?: any;
    screenRecording?: any;
    meta?: any;
}

export interface SupportUpdateCommentById {
    id: string;
    rowId?: number;
    issueId?: string;
    externalId?: string;
    description?: string;
    attachments?: any;
    screenRecording?: any;
    meta?: any;
}

export interface SupportUpdateComments {
    id?: string;
    rowId?: number;
    issueId?: string;
    externalId?: string;
    description?: string;
    attachments?: any;
    screenRecording?: any;
    meta?: any;
}
