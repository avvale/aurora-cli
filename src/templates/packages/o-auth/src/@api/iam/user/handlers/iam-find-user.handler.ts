import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindUserQuery } from '../../../../@apps/iam/user/application/find/find-user.query';
import { IamUser } from '../../../../graphql';
import { IamUserDto } from '../dto';

@Injectable()
export class IamFindUserHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser | IamUserDto>
    {
        return await this.queryBus.ask(new FindUserQuery(queryStatement, constraint, { timezone }));
    }
}