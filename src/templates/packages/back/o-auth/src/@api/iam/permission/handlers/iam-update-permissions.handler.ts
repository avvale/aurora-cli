import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetPermissionsQuery } from '@apps/iam/permission/application/get/get-permissions.query';
import { UpdatePermissionsCommand } from '@apps/iam/permission/application/update/update-permissions.command';
import { IamPermission, IamUpdatePermissionsInput } from '../../../../graphql';
import { IamPermissionDto, IamUpdatePermissionsDto } from '../dto';

@Injectable()
export class IamUpdatePermissionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionsInput | IamUpdatePermissionsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new UpdatePermissionsCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));
    }
}