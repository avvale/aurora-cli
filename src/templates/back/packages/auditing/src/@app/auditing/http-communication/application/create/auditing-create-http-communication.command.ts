import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingCreateHttpCommunicationCommand {
    constructor(
        public readonly payload: {
            id: string;
            tags?: string[];
            event: string;
            status?: number;
            method: string;
            url: string;
            httpRequest?: any;
            httpRequestRejected?: any;
            httpResponse?: any;
            httpResponseRejected?: any;
            isReprocessing: boolean;
            reprocessingHttpCommunicationId?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
