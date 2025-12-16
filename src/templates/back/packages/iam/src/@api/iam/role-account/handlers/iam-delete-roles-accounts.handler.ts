import { IamRoleAccount } from '@api/graphql';
import {
    IamDeleteRolesAccountsCommand,
    IamGetRolesAccountsQuery,
} from '@app/iam/role-account';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteRolesAccountsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRoleAccount[]> {
        const rolesAccounts = await this.queryBus.ask(
            new IamGetRolesAccountsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteRolesAccountsCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return rolesAccounts;
    }
}
