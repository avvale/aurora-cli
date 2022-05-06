import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetUsersQuery } from '../../../../@apps/iam/user/application/get/get-users.query';
import { IamUser } from '../../../../graphql';
import { IamUserDto } from '../dto';

@Injectable()
export class IamGetUsersHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser[] | IamUserDto[]>
    {
        return await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));
    }
}