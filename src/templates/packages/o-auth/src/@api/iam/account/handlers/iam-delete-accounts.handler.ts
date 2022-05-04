import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetAccountsQuery } from '../../../../@apps/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '../../../../@apps/iam/account/application/delete/delete-accounts.command';
import { IamAccount } from '../../../../graphql';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamDeleteAccountsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount[] | IamAccountDto[]>
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement, constraint, { timezone }));

        return accounts;
    }
}