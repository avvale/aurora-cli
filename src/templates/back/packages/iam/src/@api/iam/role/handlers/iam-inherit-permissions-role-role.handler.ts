import { IamCreatePermissionsRolesCommand } from '@app/iam/permission-role';
import { IamInheritRoleDto } from '../dto';
import { IamInheritRoleInput } from '@api/graphql';
import { IamFindRoleByIdQuery } from '@app/iam/role';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamInheritPermissionsRoleRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload:  IamInheritRoleInput | IamInheritRoleDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        const parentRole = await this.queryBus.ask(new IamFindRoleByIdQuery(
            payload.parentRoleId,
            {
                include: ['permissions'],
            },
            {
                timezone,
            },
        ));

        const childRole = await this.queryBus.ask(new IamFindRoleByIdQuery(
            payload.childRoleId,
            {
                include: ['permissions'],
            },
            {
                timezone,
            },
        ));

        const childPermissionIds = childRole.permissions.map(permission => permission.id);
        const parentPermissionIds = parentRole.permissions.filter(permission => !childPermissionIds.includes(permission.id)).map(permission => permission.id);

        if (parentPermissionIds.length > 0)
        {
            await this.commandBus.dispatch(new IamCreatePermissionsRolesCommand(
                parentPermissionIds.map(permissionId => ({ permissionId, roleId: childRole.id })),
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ));
        }

        return true;
    }
}