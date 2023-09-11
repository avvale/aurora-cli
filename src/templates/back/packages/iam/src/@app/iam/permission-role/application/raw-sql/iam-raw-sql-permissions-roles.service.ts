import { IamIPermissionRoleRepository, IamPermissionRole } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRawSQLPermissionsRolesService
{
    constructor(
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermissionRole[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
