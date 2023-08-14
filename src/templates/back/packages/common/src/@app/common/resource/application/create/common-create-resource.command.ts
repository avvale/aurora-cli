import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreateResourceCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            hasAttachments: boolean;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
