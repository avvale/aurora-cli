import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamPermission } from '../../domain/iam-permission.aggregate';
import { IamPermissionId } from '../../domain/value-objects';

@Injectable()
export class IamFindPermissionByIdService
{
    constructor(
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        id: IamPermissionId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermission>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
