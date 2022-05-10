import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetRolesQuery } from '@apps/iam/role/application/get/get-roles.query';
import { UpdateRolesCommand } from '@apps/iam/role/application/update/update-roles.command';
import { IamRole, IamUpdateRolesInput } from '../../../../graphql';
import { IamRoleDto, IamUpdateRolesDto } from '../dto';

@Injectable()
export class IamUpdateRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRolesInput | IamUpdateRolesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new UpdateRolesCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));
    }
}