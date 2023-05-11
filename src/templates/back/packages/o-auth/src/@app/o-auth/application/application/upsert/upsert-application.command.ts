import { CQMetadata } from '@aurorajs.dev/core';

export class UpsertApplicationCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code?: string;
            name?: string;
            secret?: string;
            isMaster?: boolean;
            clientIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}