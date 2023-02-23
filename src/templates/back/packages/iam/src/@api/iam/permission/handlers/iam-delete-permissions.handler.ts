import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { GetPermissionsQuery } from '@app/iam/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '@app/iam/permission/application/delete/delete-permissions.command';
import { IamPermission } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<IamPermission[] | IamPermissionDto[]>
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return permissions;
    }
}