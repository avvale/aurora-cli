import { IamAccountResponse } from '@app/iam/account';
import { SupportCommentResponse } from '@app/support/comment';

export class SupportIssueResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly externalId: string,
    public readonly externalStatus: string,
    public readonly externalColorStatus: string,
    public readonly accountId: string,
    public readonly accountUsername: string,
    public readonly displayName: string,
    public readonly frontEnvironment: string,
    public readonly frontVersion: string,
    public readonly backEnvironment: string,
    public readonly backVersion: string,
    public readonly subject: string,
    public readonly description: string,
    public readonly attachments: any,
    public readonly screenRecording: any,
    public readonly meta: any,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
    public readonly account: IamAccountResponse,
    public readonly comments: SupportCommentResponse[],
  ) {}
}
