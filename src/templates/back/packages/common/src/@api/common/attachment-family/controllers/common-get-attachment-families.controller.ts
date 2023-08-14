/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonAttachmentFamilyDto, CommonGetAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-families/get')
@Auth('common.attachmentFamily.get')
export class CommonGetAttachmentFamiliesController
{
    constructor(
        private readonly handler: CommonGetAttachmentFamiliesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get attachment-families according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonAttachmentFamilyDto]})
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
