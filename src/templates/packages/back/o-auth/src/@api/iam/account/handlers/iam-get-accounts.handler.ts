import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetAccountsQuery } from '@app/iam/account/application/get/get-accounts.query';
import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamGetAccountsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount[] | IamAccountDto[]>
    {
        return await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint, { timezone }));
    }
}