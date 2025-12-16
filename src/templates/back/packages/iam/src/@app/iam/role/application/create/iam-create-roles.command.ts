import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateRolesCommand {
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            defaultRedirection?: string;
            isMaster: boolean;
            permissionIds?: string[];
            accountIds?: string[];
        }[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
