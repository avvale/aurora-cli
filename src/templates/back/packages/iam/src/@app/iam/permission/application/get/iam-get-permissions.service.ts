import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamPermission } from '../../domain/iam-permission.aggregate';

@Injectable()
export class IamGetPermissionsService
{
    constructor(
        private readonly repository: IamIPermissionRepository,
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
