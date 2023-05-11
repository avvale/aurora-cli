import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IRoleRepository } from '../../domain/role.repository';
import { IamRole } from '../../domain/role.aggregate';

@Injectable()
export class GetRolesService
{
    constructor(
        private readonly repository: IRoleRepository,
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