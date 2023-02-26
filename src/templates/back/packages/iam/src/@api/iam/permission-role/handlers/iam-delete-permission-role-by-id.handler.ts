import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindPermissionRoleByIdQuery } from '@app/iam/permission-role/application/find/find-permission-role-by-id.query';
import { DeletePermissionRoleByIdCommand } from '@app/iam/permission-role/application/delete/delete-permission-role-by-id.command';
import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';
import { IamDeletePermissionRoleDto, IamPermissionRoleDto } from '../dto';

@Injectable()
export class IamDeletePermissionRoleByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamDeletePermissionRoleInput | IamDeletePermissionRoleDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        const permission = await this.queryBus.ask(new FindPermissionRoleByIdQuery(payload.permissionId, payload.roleId, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionRoleByIdCommand(
            payload,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return permission;
    }
}