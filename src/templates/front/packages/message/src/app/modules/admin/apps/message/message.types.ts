export interface MessageMessage {
    id: string;
    tenantIds?;
    status: string;
    accountRecipientIds?: string[];
    tenantRecipientIds?: string[];
    scopeRecipients?: string[];
    tagRecipients?: string[];
    sendAt?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    totalRecipients: number;
    reads: number;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface MessageCreateMessage {
    id: string;
    tenantIds?: string[];
    status: string;
    accountRecipientIds?: string[];
    tenantRecipientIds?: string[];
    scopeRecipients?: string[];
    sendAt?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    totalRecipients: number;
    reads: number;
    meta?: any;
}

export interface MessageUpdateMessageById {
    id: string;
    tenantIds?;
    status?: string;
    accountRecipientIds?;
    tenantRecipientIds?;
    scopeRecipients?;
    sendAt?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    totalRecipients?: number;
    reads?: number;
    meta?: any;
}

export interface MessageUpdateMessages {
    id?: string;
    tenantIds?: string[];
    status?: string;
    accountRecipientIds?: string[];
    tenantRecipientIds?: string[];
    scopeRecipients?: string[];
    sendAt?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    totalRecipients?: number;
    reads?: number;
    meta?: any;
}

export interface MessageInbox {
    id: string;
    tenantIds?;
    messageId: string;
    sort: number;
    accountId: string;
    accountCode?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    isRead: boolean;
    isReadAtLeastOnce: boolean;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface MessageCreateInbox {
    id: string;
    tenantIds?: string[];
    messageId: string;
    sort: number;
    accountId: string;
    accountCode?: string;
    isImportant: boolean;
    subject: string;
    body: string;
    attachments?: any;
    isRead: boolean;
    isReadAtLeastOnce: boolean;
    meta?: any;
}

export interface MessageUpdateInboxById {
    id: string;
    tenantIds?;
    messageId?: string;
    sort?: number;
    accountId?: string;
    accountCode?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    isRead?: boolean;
    isReadAtLeastOnce?: boolean;
    meta?: any;
}

export interface MessageUpdateInboxes {
    id?: string;
    tenantIds?: string[];
    messageId?: string;
    sort?: number;
    accountId?: string;
    accountCode?: string;
    isImportant?: boolean;
    subject?: string;
    body?: string;
    attachments?: any;
    isRead?: boolean;
    isReadAtLeastOnce?: boolean;
    meta?: any;
}

export enum MessageMessageStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    SENT = 'SENT',
}
