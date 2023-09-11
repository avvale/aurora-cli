import { IamCreatePermissionRoleInput } from '@api/graphql';
import { IamCreatePermissionRoleDto } from '@api/iam/permission-role';
import { IamCreatePermissionsRolesCommand } from '@app/iam/permission-role';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreatePermissionsRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreatePermissionRoleInput[] | IamCreatePermissionRoleDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreatePermissionsRolesCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}
