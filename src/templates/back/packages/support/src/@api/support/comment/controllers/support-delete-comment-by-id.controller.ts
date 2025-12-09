/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportCommentDto,
    SupportDeleteCommentByIdHandler,
} from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comment/delete')
@Auth('support.comment.delete')
export class SupportDeleteCommentByIdController {
    constructor(private readonly handler: SupportDeleteCommentByIdHandler) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete comment by id' })
    @ApiOkResponse({
        description: 'The record has been deleted successfully.',
        type: SupportCommentDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
