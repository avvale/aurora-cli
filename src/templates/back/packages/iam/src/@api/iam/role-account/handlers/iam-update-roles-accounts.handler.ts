import { IamRoleAccount, IamUpdateRolesAccountsInput } from '@api/graphql';
import {
    IamGetRolesAccountsQuery,
    IamUpdateRolesAccountsCommand,
} from '@app/iam/role-account';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateRolesAccountsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRolesAccountsInput,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRoleAccount> {
        await this.commandBus.dispatch(
            new IamUpdateRolesAccountsCommand(
                payload,
                queryStatement,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return await this.queryBus.ask(
            new IamGetRolesAccountsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
