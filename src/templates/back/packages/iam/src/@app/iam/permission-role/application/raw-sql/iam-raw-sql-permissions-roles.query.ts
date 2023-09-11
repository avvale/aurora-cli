import { CQMetadata } from '@aurorajs.dev/core';

export class IamRawSQLPermissionsRolesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
