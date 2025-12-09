/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    SupportCommentDto,
    SupportFindCommentByIdHandler,
} from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[support] comment')
@Controller('support/comment/find')
@Auth('support.comment.get')
export class SupportFindCommentByIdController {
    constructor(private readonly handler: SupportFindCommentByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find comment by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: SupportCommentDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
