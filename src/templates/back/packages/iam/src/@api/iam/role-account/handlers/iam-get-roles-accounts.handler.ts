import { IamRoleAccount } from '@api/graphql';
import { IamRoleAccountDto } from '@api/iam/role-account';
import { IamGetRolesAccountsQuery } from '@app/iam/role-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetRolesAccountsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRoleAccount[] | IamRoleAccountDto[]> {
        return await this.queryBus.ask(
            new IamGetRolesAccountsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
