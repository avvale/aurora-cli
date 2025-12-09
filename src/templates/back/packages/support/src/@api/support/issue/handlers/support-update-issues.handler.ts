import { SupportIssue, SupportUpdateIssuesInput } from '@api/graphql';
import { SupportIssueDto, SupportUpdateIssuesDto } from '@api/support/issue';
import {
    SupportGetIssuesQuery,
    SupportUpdateIssuesCommand,
} from '@app/support/issue';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportUpdateIssuesHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: SupportUpdateIssuesInput | SupportUpdateIssuesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportIssue | SupportIssueDto> {
        await this.commandBus.dispatch(
            new SupportUpdateIssuesCommand(
                payload,
                queryStatement,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return await this.queryBus.ask(
            new SupportGetIssuesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
