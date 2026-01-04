import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreateRoleCommand {
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            defaultRedirection?: string;
            hasHiddenVerticalNavigation?: boolean;
            isMaster: boolean;
            permissionIds?: string[];
            accountIds?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
