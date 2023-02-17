import { CQMetadata } from '@aurora-ts/core';

export class CreateHttpCommunicationsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code?: string;
            event: string;
            status?: number;
            method: string;
            url: string;
            httpRequest?: any;
            httpRequestRejected?: any;
            httpResponse?: any;
            httpResponseRejected?: any;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}