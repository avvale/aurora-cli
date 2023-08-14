import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamRole } from '../../domain/iam-role.aggregate';

@Injectable()
export class IamGetRolesService
{
    constructor(
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamRole[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
