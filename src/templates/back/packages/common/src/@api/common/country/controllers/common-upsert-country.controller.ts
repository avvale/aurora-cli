/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto, CommonUpdateCountryByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpsertCountryHandler } from '../handlers/common-upsert-country.handler';

@ApiTags('[common] country')
@Controller('common/country/upsert')
@Auth('common.country.upsert')
export class CommonUpsertCountryController
{
    constructor(
        private readonly handler: CommonUpsertCountryHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert country' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: CommonCountryDto })
    async main(
        @Body() payload: CommonUpdateCountryByIdDto,
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