import { IamIPermissionRepository } from '@app/iam/permission';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMinPermissionService
{
    constructor(
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.min(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
