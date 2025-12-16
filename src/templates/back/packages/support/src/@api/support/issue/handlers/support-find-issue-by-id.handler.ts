import { SupportIssue } from '@api/graphql';
import { SupportFindIssueByIdQuery } from '@app/support/issue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SupportFindIssueByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportIssue> {
        const issue = await this.queryBus.ask(
            new SupportFindIssueByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!issue) {
            throw new NotFoundException(
                `SupportIssue with id: ${id}, not found`,
            );
        }

        return issue;
    }
}
