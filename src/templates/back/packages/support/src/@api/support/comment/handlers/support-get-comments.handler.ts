import { SupportComment } from '@api/graphql';
import { SupportCommentDto } from '@api/support/comment';
import { SupportGetCommentsQuery } from '@app/support/comment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportGetCommentsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportComment[] | SupportCommentDto[]> {
        return await this.queryBus.ask(
            new SupportGetCommentsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
