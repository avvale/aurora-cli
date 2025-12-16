import { IamPermissionRole } from '@api/graphql';
import { IamFindPermissionRoleByIdQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindPermissionRoleByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        permissionId: string,
        roleId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermissionRole> {
        const permissionRole = await this.queryBus.ask(
            new IamFindPermissionRoleByIdQuery(
                permissionId,
                roleId,
                constraint,
                {
                    timezone,
                },
            ),
        );

        if (!permissionRole) {
            throw new NotFoundException(
                `IamPermissionRole with permissionId: ${permissionId} roleId: ${roleId}, not found`,
            );
        }

        return permissionRole;
    }
}
