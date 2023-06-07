/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto, CommonUpdateCountriesDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';

@ApiTags('[common] country')
@Controller('common/countries/update')
@Auth('common.country.update')
export class CommonUpdateCountriesController
{
    constructor(
        private readonly handler: CommonUpdateCountriesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update countries' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonCountryDto })
    async main(
        @Body() payload: CommonUpdateCountriesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}