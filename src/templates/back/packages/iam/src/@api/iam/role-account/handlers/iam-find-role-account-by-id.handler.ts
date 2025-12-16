import { IamRoleAccount } from '@api/graphql';
import { IamFindRoleAccountByIdQuery } from '@app/iam/role-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindRoleAccountByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        roleId: string,
        accountId: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRoleAccount> {
        const roleAccount = await this.queryBus.ask(
            new IamFindRoleAccountByIdQuery(roleId, accountId, constraint, {
                timezone,
            }),
        );

        if (!roleAccount) {
            throw new NotFoundException(
                `IamRoleAccount with roleId: ${roleId} accountId: ${accountId}, not found`,
            );
        }

        return roleAccount;
    }
}
