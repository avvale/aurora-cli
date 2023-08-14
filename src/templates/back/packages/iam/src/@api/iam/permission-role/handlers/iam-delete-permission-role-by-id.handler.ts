import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { IamDeletePermissionRoleByIdCommand, IamFindPermissionRoleByIdQuery } from '@app/iam/permission-role';
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
        const permission = await this.queryBus.ask(new IamFindPermissionRoleByIdQuery(
            payload.permissionId,
            payload.roleId,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new IamDeletePermissionRoleByIdCommand(
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