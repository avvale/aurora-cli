/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCountryDto, CommonCreateCountriesHandler, CommonCreateCountryDto } from '@api/common/country';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/countries/create')
@Auth('common.country.create')
export class CommonCreateCountriesController
{
    constructor(
        private readonly handler: CommonCreateCountriesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create countries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonCountryDto]})
    @ApiBody({ type: [CommonCreateCountryDto]})
    async main(
        @Body() payload: CommonCreateCountryDto[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}
