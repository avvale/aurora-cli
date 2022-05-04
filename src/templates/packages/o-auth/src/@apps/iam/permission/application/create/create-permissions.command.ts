import { CQMetadata } from 'aurora-ts-core';

export class CreatePermissionsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            boundedContextId: string;
            roleIds?: string[];
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}