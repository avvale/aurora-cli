import { IamPermissionRole, IamUpdatePermissionRoleByIdInput } from '@api/graphql';
import { IamPermissionRoleDto, IamUpdatePermissionRoleByIdDto } from '@api/iam/permission-role';
import { IamFindPermissionRoleByIdQuery, IamUpdatePermissionRoleByIdCommand } from '@app/iam/permission-role';
import { AuditingMeta, diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdatePermissionRoleByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionRoleByIdInput | IamUpdatePermissionRoleByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        const permissionRole = await this.queryBus.ask(new IamFindPermissionRoleByIdQuery(
            payload.permissionId,
            payload.roleId,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, permissionRole);

        await this.commandBus.dispatch(new IamUpdatePermissionRoleByIdCommand(
            {
                ...dataToUpdate,
                permissionId: payload.permissionId,
                roleId: payload.roleId,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindPermissionRoleByIdQuery(
            payload.permissionId,
            payload.roleId,
            constraint,
            {
                timezone,
            },
        ));
    }
}
