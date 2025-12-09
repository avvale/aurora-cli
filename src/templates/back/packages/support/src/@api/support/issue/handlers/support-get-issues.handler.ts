import { SupportIssue } from '@api/graphql';
import { SupportIssueDto } from '@api/support/issue';
import { SupportGetIssuesQuery } from '@app/support/issue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportGetIssuesHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportIssue[] | SupportIssueDto[]> {
        return await this.queryBus.ask(
            new SupportGetIssuesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
