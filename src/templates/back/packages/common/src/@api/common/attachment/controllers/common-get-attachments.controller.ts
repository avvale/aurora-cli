/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto, CommonGetAttachmentsHandler } from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachments/get')
@Auth('common.attachment.get')
export class CommonGetAttachmentsController
{
    constructor(
        private readonly handler: CommonGetAttachmentsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get attachments according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonAttachmentDto]})
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
