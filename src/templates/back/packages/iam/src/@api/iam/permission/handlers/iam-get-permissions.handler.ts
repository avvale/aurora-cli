import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '@api/iam/permission';
import { IamGetPermissionsQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetPermissionsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission[] | IamPermissionDto[]> {
        return await this.queryBus.ask(
            new IamGetPermissionsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
