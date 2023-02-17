
export class HttpCommunicationResponse
{
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly event: string,
        public readonly status: number,
        public readonly method: string,
        public readonly url: string,
        public readonly httpRequest: any,
        public readonly httpRequestRejected: any,
        public readonly httpResponse: any,
        public readonly httpResponseRejected: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}