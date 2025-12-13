import { SupportComment, SupportUpdateCommentsInput } from '@api/graphql';
import {
    SupportGetCommentsQuery,
    SupportUpdateCommentsCommand,
} from '@app/support/comment';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportUpdateCommentsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: SupportUpdateCommentsInput,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportComment> {
        await this.commandBus.dispatch(
            new SupportUpdateCommentsCommand(
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
            new SupportGetCommentsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
