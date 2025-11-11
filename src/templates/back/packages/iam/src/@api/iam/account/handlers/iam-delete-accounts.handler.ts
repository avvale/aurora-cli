import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '@api/iam/account';
import {
    IamDeleteAccountsCommand,
    IamGetAccountsQuery,
} from '@app/iam/account';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteAccountsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount[] | IamAccountDto[]> {
        const accounts = await this.queryBus.ask(
            new IamGetAccountsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteAccountsCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return accounts;
    }
}
