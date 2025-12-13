import { IamBoundedContext } from '@api/graphql';
import { IamGetBoundedContextsQuery } from '@app/iam/bounded-context';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetBoundedContextsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext[]> {
        return await this.queryBus.ask(
            new IamGetBoundedContextsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
