import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { IamUser } from '@api/graphql';
import { IamUserDto } from '../dto';

@Injectable()
export class IamFindUserByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        return await this.queryBus.ask(new FindUserByIdQuery(id, constraint, { timezone }));
    }
}