export class MessageInboxSettingResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly accountId: string,
    public readonly lastReadMessageRowId: number,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
