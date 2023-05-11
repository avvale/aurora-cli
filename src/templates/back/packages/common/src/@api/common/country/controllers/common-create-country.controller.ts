/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurorajs.dev/core';
import { CommonCountryDto, CommonCreateCountryDto } from '../dto';

// @app
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';

@ApiTags('[common] country')
@Controller('common/country/create')
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
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}