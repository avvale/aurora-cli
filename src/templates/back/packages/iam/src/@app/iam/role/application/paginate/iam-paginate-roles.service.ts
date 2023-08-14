import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamRole } from '../../domain/iam-role.aggregate';

@Injectable()
export class IamPaginateRolesService
{
    constructor(
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<IamRole>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
