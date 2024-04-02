/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamPaginateTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tags/paginate')
@Auth('iam.tag.get')
export class IamPaginateTagsController
{
    constructor(
        private readonly handler: IamPaginateTagsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate tags' })
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
