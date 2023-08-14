import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '@api/iam/permission';
import { IamFindPermissionQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        return await this.queryBus.ask(new IamFindPermissionQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
