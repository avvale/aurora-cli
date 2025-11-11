import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamDeletePermissionRoleByIdCommand {
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
