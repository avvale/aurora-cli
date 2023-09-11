import { IamPermissionRole } from '@api/graphql';
import { IamPermissionRoleDto } from '@api/iam/permission-role';
import { IamDeletePermissionsRolesCommand, IamGetPermissionsRolesQuery } from '@app/iam/permission-role';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeletePermissionsRolesHandler
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
    ): Promise<IamPermissionRole[] | IamPermissionRoleDto[]>
    {
        const permissionsRoles = await this.queryBus.ask(new IamGetPermissionsRolesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new IamDeletePermissionsRolesCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return permissionsRoles;
    }
}
