import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatePermissionCommand {
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            boundedContextId: string;
            roleIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
