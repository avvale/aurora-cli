/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCountryDto, CommonDeleteCountriesHandler } from '@api/common/country';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/countries/delete')
@Auth('common.country.delete')
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
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}
