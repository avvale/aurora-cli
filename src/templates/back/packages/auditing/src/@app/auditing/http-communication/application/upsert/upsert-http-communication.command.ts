import { CQMetadata } from '@aurora-ts/core';

export class UpsertHttpCommunicationCommand
{
    constructor(
        public readonly payload: {
            id: string;
            tags?: any;
            event?: string;
            status?: number;
            method?: string;
            url?: string;
            httpRequest?: any;
            httpRequestRejected?: any;
            httpResponse?: any;
            httpResponseRejected?: any;
            isReprocessing?: boolean;
            reprocessingHttpCommunicationId?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}