export class AuditingUpdatedHttpCommunicationEvent
{
    constructor(
        public readonly id: string,
        public readonly tags: any,
        public readonly event: string,
        public readonly status: number,
        public readonly method: string,
        public readonly url: string,
        public readonly httpRequest: any,
        public readonly httpRequestRejected: any,
        public readonly httpResponse: any,
        public readonly httpResponseRejected: any,
        public readonly isReprocessing: boolean,
        public readonly reprocessingHttpCommunicationId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
