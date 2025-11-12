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
    video?: any;
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

export type SupportIssueRecordingState = 'idle' | 'recording' | 'paused' | 'recorded';
export type SupportIssueDisplaySurface = 'tab' | 'window' | 'screen' | 'any';
