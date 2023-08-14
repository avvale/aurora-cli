import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';
import { IamDeletePermissionsRolesCommand, IamGetPermissionsRolesQuery } from '@app/iam/permission-role';
import { AuditingMeta, ICommandBus, IQueryBus, Operator, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
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
        const permissionsRoles = await this.queryBus.ask(new IamGetPermissionsRolesQuery({
            where: {
                [Operator.or]: payload.map(permissionRole => ({
                    permissionId: permissionRole.permissionId,
                    roleId      : permissionRole.roleId,
                })),
            },
        }, constraint, { timezone }));

        await this.commandBus.dispatch(new IamDeletePermissionsRolesCommand(
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