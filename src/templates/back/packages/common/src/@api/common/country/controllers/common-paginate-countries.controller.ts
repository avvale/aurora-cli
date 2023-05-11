/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ContentLanguage, Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonPaginateCountriesHandler } from '../handlers/common-paginate-countries.handler';

@ApiTags('[common] country')
@Controller('common/countries/paginate')
export class CommonPaginateCountriesController
{
    constructor(
        private readonly handler: CommonPaginateCountriesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate countries' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage?: string,
        );
    }
}