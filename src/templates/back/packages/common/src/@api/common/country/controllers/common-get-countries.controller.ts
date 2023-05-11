/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto } from '../dto';

// @app
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';

@ApiTags('[common] country')
@Controller('common/countries/get')
export class CommonGetCountriesController
{
    constructor(
        private readonly handler: CommonGetCountriesHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get countries according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonCountryDto]})
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