import { CQMetadata } from '@aurora-ts/core';

export class CreateScopeCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code: string;
            name: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}