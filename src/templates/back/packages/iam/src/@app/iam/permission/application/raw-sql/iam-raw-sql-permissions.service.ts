import { IamIPermissionRepository, IamPermission } from '@app/iam/permission';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRawSQLPermissionsService
{
    constructor(
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermission[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
