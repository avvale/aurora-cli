/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentFamilyDto, CommonFindAttachmentFamilyHandler } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-family/find')
@Auth('common.attachmentFamily.get')
export class CommonFindAttachmentFamilyController
{
    constructor(
        private readonly handler: CommonFindAttachmentFamilyHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find attachment-family according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAttachmentFamilyDto })
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
