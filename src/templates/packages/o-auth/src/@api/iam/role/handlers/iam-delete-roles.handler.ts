import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';
import { DeleteRolesCommand } from '../../../../@apps/iam/role/application/delete/delete-roles.command';
import { IamRole } from '../../../../graphql';
import { IamRoleDto } from '../dto';

@Injectable()
export class IamDeleteRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole[] | IamRoleDto[]>
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRolesCommand(queryStatement, constraint, { timezone }));

        return roles;
    }
}