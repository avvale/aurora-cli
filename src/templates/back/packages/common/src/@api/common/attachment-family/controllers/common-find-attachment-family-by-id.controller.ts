/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentFamilyDto, CommonFindAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-family/find')
@Auth('common.attachmentFamily.get')
export class CommonFindAttachmentFamilyByIdController
{
    constructor(
        private readonly handler: CommonFindAttachmentFamilyByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find attachment-family by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: CommonAttachmentFamilyDto })
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
