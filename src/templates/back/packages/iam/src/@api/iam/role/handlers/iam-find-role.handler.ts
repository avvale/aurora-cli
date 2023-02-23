import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindRoleQuery } from '@app/iam/role/application/find/find-role.query';
import { IamRole } from '@api/graphql';
import { IamRoleDto } from '../dto';

@Injectable()
export class IamFindRoleHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatement, constraint, { timezone }));
    }
}