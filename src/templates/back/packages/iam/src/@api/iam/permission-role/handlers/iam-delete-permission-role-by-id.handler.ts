import { IamPermissionRole } from '@api/graphql';
import { IamPermissionRoleDto } from '@api/iam/permission-role';
import { IamDeletePermissionRoleByIdCommand, IamFindPermissionRoleByIdQuery } from '@app/iam/permission-role';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeletePermissionRoleByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        permissionId: string,
        roleId: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        const permissionRole = await this.queryBus.ask(new IamFindPermissionRoleByIdQuery(
            permissionId,
            roleId,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new IamDeletePermissionRoleByIdCommand(
            permissionId,
            roleId,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return permissionRole;
    }
}
