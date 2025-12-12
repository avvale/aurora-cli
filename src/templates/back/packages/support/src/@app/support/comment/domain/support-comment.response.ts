import { IamAccountResponse } from '@app/iam/account';
import { SupportIssueResponse } from '@app/support/issue';

export class SupportCommentResponse {
    constructor(
        public readonly id: string,
        public readonly parentId: string,
        public readonly rowId: number,
        public readonly externalId: string,
        public readonly externalParentId: string,
        public readonly issueId: string,
        public readonly accountId: string,
        public readonly accountUsername: string,
        public readonly displayName: string,
        public readonly description: string,
        public readonly attachments: any,
        public readonly screenRecording: any,
        public readonly meta: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly parent: SupportCommentResponse,
        public readonly externalParent: SupportCommentResponse,
        public readonly issue: SupportIssueResponse,
        public readonly account: IamAccountResponse,
    ) {}
}
