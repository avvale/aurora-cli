import { SupportIssue } from '@api/graphql';
import { SupportFindIssueQuery } from '@app/support/issue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SupportFindIssueHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportIssue> {
        const issue = await this.queryBus.ask(
            new SupportFindIssueQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        if (!issue) throw new NotFoundException(`SupportIssue not found`);

        return issue;
    }
}
