import { Account } from '@aurora';

export enum SpinnerType {
    BUBBLE = 'BUBBLE',
    PLAIN = 'PLAIN',
}

export interface ChatMessage {
    id: string;
    groupId: string;
    objectId?: string;
    conversationId?: string;
    accountId: string;
    account: Account;
    status: string;
    message: string;
    createdAt: string;
}
