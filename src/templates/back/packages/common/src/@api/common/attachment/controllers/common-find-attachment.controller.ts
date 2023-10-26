/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto, CommonFindAttachmentHandler } from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/find')
@Auth('common.attachment.get')
export class CommonFindAttachmentController
{
    constructor(
        private readonly handler: CommonFindAttachmentHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find attachment according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAttachmentDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
