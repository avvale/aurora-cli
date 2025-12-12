import { SupportComment } from '@api/graphql';
import { SupportCommentDto } from '@api/support/comment';
import { SupportFindCommentByIdQuery } from '@app/support/comment';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SupportFindCommentByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<SupportComment | SupportCommentDto> {
        const comment = await this.queryBus.ask(
            new SupportFindCommentByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!comment)
            throw new NotFoundException(
                `SupportComment with id: ${id}, not found`,
            );

        return comment;
    }
}
