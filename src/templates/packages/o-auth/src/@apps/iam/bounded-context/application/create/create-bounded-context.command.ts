import { CQMetadata } from 'aurora-ts-core';

export class CreateBoundedContextCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            root: string;
            sort?: number;
            isActive: boolean;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}