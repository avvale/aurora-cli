import { IamPermissionRole } from '@api/graphql';
import { IamPermissionRoleDto } from '@api/iam/permission-role';
import { IamFindPermissionRoleByIdQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionRoleByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        permissionId: string,
        roleId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        return await this.queryBus.ask(new IamFindPermissionRoleByIdQuery(
            permissionId,
            roleId,
            constraint,
            {
                timezone,
            },
        ));
    }
}
