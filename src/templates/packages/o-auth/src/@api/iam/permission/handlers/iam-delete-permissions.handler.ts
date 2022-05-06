import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetPermissionsQuery } from '../../../../@apps/iam/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '../../../../@apps/iam/permission/application/delete/delete-permissions.command';
import { IamPermission } from '../../../../graphql';
import { IamPermissionDto } from '../dto';

@Injectable()
export class IamDeletePermissionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission[] | IamPermissionDto[]>
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatement, constraint, { timezone }));

        return permissions;
    }
}