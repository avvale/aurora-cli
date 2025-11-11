import { IamBoundedContext } from '@api/graphql';
import { IamBoundedContextDto } from '@api/iam/bounded-context';
import { IamFindBoundedContextQuery } from '@app/iam/bounded-context';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindBoundedContextHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto> {
        return await this.queryBus.ask(
            new IamFindBoundedContextQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
