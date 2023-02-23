import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, Operator, QueryStatement } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { GetPermissionsRolesQuery } from '@app/iam/permission-role/application/get/get-permissions-roles.query';
import { DeletePermissionsRolesCommand } from '@app/iam/permission-role/application/delete/delete-permissions-roles.command';
import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';
import { IamDeletePermissionRoleDto, IamPermissionRoleDto } from '../dto';

@Injectable()
export class IamDeletePermissionsRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamDeletePermissionRoleInput[] | IamDeletePermissionRoleDto[],
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole[] | IamPermissionRoleDto[]>
    {
        const permissionsRoles = await this.queryBus.ask(new GetPermissionsRolesQuery({
            where: {
                [Operator.or]: payload.map(permissionRole => ({
                    permissionId: permissionRole.permissionId,
                    roleId      : permissionRole.roleId,
                })),
            },
        }, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionsRolesCommand(
            payload,
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