/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonCountryDto, CommonCreateCountryDto, CommonCreateCountryHandler } from '@api/common/country';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, ContentLanguage, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] country')
@Controller('common/country/create')
@Auth('common.country.create')
export class CommonCreateCountryController
{
    constructor(
        private readonly handler: CommonCreateCountryHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create country' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CommonCountryDto })
    async main(
        @Body() payload: CommonCreateCountryDto,
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
