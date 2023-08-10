import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '@api/iam/permission';
import { IamFindPermissionByIdQuery } from '@app/iam/permission';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindPermissionByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        return await this.queryBus.ask(new IamFindPermissionByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
