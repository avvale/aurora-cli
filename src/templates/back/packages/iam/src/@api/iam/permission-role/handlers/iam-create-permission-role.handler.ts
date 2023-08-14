import { IamCreatePermissionRoleInput, IamPermissionRole } from '@api/graphql';
import { IamCreatePermissionRoleCommand, IamFindPermissionRoleByIdQuery } from '@app/iam/permission-role';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { IamCreatePermissionRoleDto, IamPermissionRoleDto } from '../dto';

@Injectable()
export class IamCreatePermissionRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreatePermissionRoleInput | IamCreatePermissionRoleDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        await this.commandBus.dispatch(new IamCreatePermissionRoleCommand(
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
            { timezone },
        ));
    }
}