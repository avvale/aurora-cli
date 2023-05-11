import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';

@Injectable()
export class GetPermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermission[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}