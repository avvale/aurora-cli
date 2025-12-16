import { IamRoleAccount } from '@api/graphql';
import { IamFindRoleAccountQuery } from '@app/iam/role-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindRoleAccountHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRoleAccount> {
        const roleAccount = await this.queryBus.ask(
            new IamFindRoleAccountQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        if (!roleAccount) {
            throw new NotFoundException(`IamRoleAccount not found`);
        }

        return roleAccount;
    }
}
