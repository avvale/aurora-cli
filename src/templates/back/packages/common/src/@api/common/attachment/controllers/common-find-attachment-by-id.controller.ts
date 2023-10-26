/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentDto, CommonFindAttachmentByIdHandler } from '@api/common/attachment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment')
@Controller('common/attachment/find')
@Auth('common.attachment.get')
export class CommonFindAttachmentByIdController
{
    constructor(
        private readonly handler: CommonFindAttachmentByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find attachment by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonAttachmentDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
