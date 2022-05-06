import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { CountryDto } from './../dto/country.dto';
import { CreateCountryDto } from './../dto/create-country.dto';

// @apps
import { CreateCountriesCommand } from '../../../../@apps/common/country/application/create/create-countries.command';

@ApiTags('[common] country')
@Controller('common/countries')
export class CommonCreateCountriesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create countries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CountryDto] })
    @ApiBody({ type: [CreateCountryDto] })
    async main(
        @Body() payload: CreateCountryDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(payload, { timezone }));
    }
}