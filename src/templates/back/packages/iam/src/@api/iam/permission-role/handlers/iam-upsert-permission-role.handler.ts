import { IamPermissionRole, IamUpdatePermissionRoleByIdInput } from '@api/graphql';
import { IamPermissionRoleDto, IamUpdatePermissionRoleByIdDto } from '@api/iam/permission-role';
import { IamFindPermissionRoleByIdQuery, IamUpsertPermissionRoleCommand } from '@app/iam/permission-role';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertPermissionRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionRoleByIdInput | IamUpdatePermissionRoleByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        await this.commandBus.dispatch(new IamUpsertPermissionRoleCommand(
            payload,
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
            {},
            {
                timezone,
            },
        ));
    }
}
