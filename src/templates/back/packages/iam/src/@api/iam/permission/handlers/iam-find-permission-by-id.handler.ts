import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindPermissionByIdQuery } from '@app/iam/permission/application/find/find-permission-by-id.query';
import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '../dto';

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
        return await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint, { timezone }));
    }
}