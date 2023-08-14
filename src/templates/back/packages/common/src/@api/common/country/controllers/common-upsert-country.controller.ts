/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCountryDto, CommonUpdateCountryByIdDto, CommonUpsertCountryHandler } from '@api/common/country';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, ContentLanguage, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
        @ContentLanguage() contentLanguage?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}
