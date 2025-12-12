import { SupportIssue } from '@api/graphql';
import { SupportIssueDto } from '@api/support/issue';
import {
    SupportDeleteIssueByIdCommand,
    SupportFindIssueByIdQuery,
} from '@app/support/issue';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SupportDeleteIssueByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportIssue | SupportIssueDto> {
        const issue = await this.queryBus.ask(
            new SupportFindIssueByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!issue)
            throw new NotFoundException(
                `SupportIssue with id: ${id}, not found`,
            );

        await this.commandBus.dispatch(
            new SupportDeleteIssueByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return issue;
    }
}
