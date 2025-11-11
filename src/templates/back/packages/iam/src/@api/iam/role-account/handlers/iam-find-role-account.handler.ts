import { IamRoleAccount } from '@api/graphql';
import { IamRoleAccountDto } from '@api/iam/role-account';
import { IamFindRoleAccountQuery } from '@app/iam/role-account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindRoleAccountHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRoleAccount | IamRoleAccountDto> {
        return await this.queryBus.ask(
            new IamFindRoleAccountQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
