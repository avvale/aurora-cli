import { SupportIssue } from '@api/graphql';
import { SupportIssueDto } from '@api/support/issue';
import { SupportFindIssueQuery } from '@app/support/issue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportFindIssueHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportIssue | SupportIssueDto> {
        return await this.queryBus.ask(
            new SupportFindIssueQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
