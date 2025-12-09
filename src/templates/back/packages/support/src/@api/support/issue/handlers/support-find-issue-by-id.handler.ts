import { SupportIssue } from '@api/graphql';
import { SupportIssueDto } from '@api/support/issue';
import { SupportFindIssueByIdQuery } from '@app/support/issue';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportFindIssueByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportIssue | SupportIssueDto> {
        return await this.queryBus.ask(
            new SupportFindIssueByIdQuery(id, constraint, {
                timezone,
            }),
        );
    }
}
