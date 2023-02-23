import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';

@Injectable()
export class RawSQLPermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository,
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