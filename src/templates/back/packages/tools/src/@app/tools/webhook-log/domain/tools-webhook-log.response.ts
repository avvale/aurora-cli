export class ToolsWebhookLogResponse {
    constructor(
        public readonly id: string,
        public readonly rowId: number,
        public readonly url: string,
        public readonly headerRequest: any,
        public readonly bodyRequest: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
