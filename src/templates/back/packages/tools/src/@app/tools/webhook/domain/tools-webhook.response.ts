export class ToolsWebhookResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly name: string,
    public readonly service: string,
    public readonly endpoint: string,
    public readonly externalId: string,
    public readonly events: string[],
    public readonly secret: string,
    public readonly meta: any,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
  ) {}
}
