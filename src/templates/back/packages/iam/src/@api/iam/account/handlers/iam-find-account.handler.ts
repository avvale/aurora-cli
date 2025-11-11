import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '@api/iam/account';
import { IamFindAccountQuery } from '@app/iam/account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindAccountHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto> {
        return await this.queryBus.ask(
            new IamFindAccountQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
