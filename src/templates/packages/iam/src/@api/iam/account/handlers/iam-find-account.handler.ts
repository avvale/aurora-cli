import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccountQuery } from '../../../../@apps/iam/account/application/find/find-account.query';
import { IamAccount } from '../../../../graphql';
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