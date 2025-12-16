/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportCommentDto,
    SupportDeleteCommentsHandler,
} from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comments/delete')
@Auth('support.comment.delete')
export class SupportDeleteCommentsController {
    constructor(private readonly handler: SupportDeleteCommentsHandler) {}

    @Delete()
    @ApiOperation({ summary: 'Delete comments in batch according to query' })
    @ApiOkResponse({
        description: 'The records has been deleted successfully.',
        type: [SupportCommentDto],
    })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
