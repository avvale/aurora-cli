import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { GetAccountsQuery } from '@app/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '@app/iam/account/application/delete/delete-accounts.command';
import { IamAccount } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<IamAccount[] | IamAccountDto[]>
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccountsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return accounts;
    }
}