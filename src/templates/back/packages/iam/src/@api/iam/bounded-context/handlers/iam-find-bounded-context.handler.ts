import { IamBoundedContext } from '@api/graphql';
import { IamBoundedContextDto } from '@api/iam/bounded-context';
import { IamFindBoundedContextQuery } from '@app/iam/bounded-context';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindBoundedContextHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto> {
        const boundedContext = await this.queryBus.ask(
            new IamFindBoundedContextQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        if (!boundedContext)
            throw new NotFoundException(`IamBoundedContext not found`);

        return boundedContext;
    }
}
