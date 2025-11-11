import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatePermissionRoleCommand {
    constructor(
        public readonly payload: {
            permissionId: string;
            roleId: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
