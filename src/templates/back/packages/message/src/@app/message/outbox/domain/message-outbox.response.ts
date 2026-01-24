import { MessageMessageResponse } from '@app/message/message';

export class MessageOutboxResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly messageId: string,
    public readonly accountRecipientIds: string[],
    public readonly tenantRecipientIds: string[],
    public readonly scopeRecipients: string[],
    public readonly tagRecipients: string[],
    public readonly meta: any,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
    public readonly message: MessageMessageResponse,
  ) {}
}
