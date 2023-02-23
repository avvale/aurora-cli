import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindAccountQuery } from '@app/iam/account/application/find/find-account.query';
import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamFindAccountHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        return await this.queryBus.ask(new FindAccountQuery(queryStatement, constraint, { timezone }));
    }
}