/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto, CommonCreateCountryDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';

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