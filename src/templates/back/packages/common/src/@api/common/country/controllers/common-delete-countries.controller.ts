/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto } from '../dto';

// @app
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';

@ApiTags('[common] country')
@Controller('common/countries/delete')
export class CommonDeleteCountriesController
{
    constructor(
        private readonly handler: CommonDeleteCountriesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete countries in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [CommonCountryDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
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