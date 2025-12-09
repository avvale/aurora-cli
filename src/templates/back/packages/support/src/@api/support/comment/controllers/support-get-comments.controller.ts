/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportCommentDto,
    SupportGetCommentsHandler,
} from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comments/get')
@Auth('support.comment.get')
export class SupportGetCommentsController {
    constructor(private readonly handler: SupportGetCommentsHandler) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get comments according to query' })
    @ApiOkResponse({
        description: 'The records has been found successfully.',
        type: [SupportCommentDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
