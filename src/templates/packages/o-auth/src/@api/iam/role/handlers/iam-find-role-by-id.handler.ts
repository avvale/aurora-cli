import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';
import { IamRole } from '../../../../graphql';
import { IamRoleDto } from '../dto';

@Injectable()
export class IamFindRoleByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id, constraint, { timezone }));
    }
}