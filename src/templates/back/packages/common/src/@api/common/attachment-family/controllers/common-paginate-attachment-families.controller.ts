/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonPaginateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] attachment-family')
@Controller('common/attachment-families/paginate')
@Auth('common.attachmentFamily.get')
export class CommonPaginateAttachmentFamiliesController
{
    constructor(
        private readonly handler: CommonPaginateAttachmentFamiliesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate attachment-families' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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
