import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '@api/iam/account';
import { IamGetAccountsQuery } from '@app/iam/account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new IamGetAccountsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
