import { SupportComment, SupportUpdateCommentsInput } from '@api/graphql';
import {
    SupportCommentDto,
    SupportUpdateCommentsDto,
} from '@api/support/comment';
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
        payload: SupportUpdateCommentsInput | SupportUpdateCommentsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<SupportComment | SupportCommentDto> {
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
