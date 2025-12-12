import { SupportComment } from '@api/graphql';
import { SupportCommentDto } from '@api/support/comment';
import { SupportFindCommentQuery } from '@app/support/comment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SupportFindCommentHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportComment | SupportCommentDto> {
        const comment = await this.queryBus.ask(
            new SupportFindCommentQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        if (!comment) throw new NotFoundException(`SupportComment not found`);

        return comment;
    }
}
