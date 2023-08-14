import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamPermission } from '../../domain/iam-permission.aggregate';

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
