import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateCountryDto } from './../dto/create-country.dto';
import { CountryDto } from './../dto/country.dto';

// @apps
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';
import { CreateCountryCommand } from '../../../../@apps/common/country/application/create/create-country.command';

@ApiTags('[common] country')
@Controller('common/country')
export class CommonCreateCountryController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create country' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CountryDto })
    async main(
        @Body() payload: CreateCountryDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountryCommand(payload, { timezone }));

        const constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}