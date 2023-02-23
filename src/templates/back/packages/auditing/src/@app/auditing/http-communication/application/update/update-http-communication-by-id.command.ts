import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateHttpCommunicationByIdCommand
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
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}