export class ToolsKeyValueResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly key: string,
    public readonly type: string,
    public readonly value: string,
    public readonly isCached: boolean,
    public readonly isActive: boolean,
    public readonly description: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
