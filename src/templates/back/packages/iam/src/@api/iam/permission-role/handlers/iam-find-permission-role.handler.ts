import { IamPermissionRole } from '@api/graphql';
import { IamPermissionRoleDto } from '@api/iam/permission-role';
import { IamFindPermissionRoleQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionRoleHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermissionRole | IamPermissionRoleDto> {
        return await this.queryBus.ask(
            new IamFindPermissionRoleQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
