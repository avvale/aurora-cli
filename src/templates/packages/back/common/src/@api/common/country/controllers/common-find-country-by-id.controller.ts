import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, AddI18NConstraintService, ContentLanguage, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { CountryDto } from './../dto/country.dto';

// @apps
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';

@ApiTags('[common] country')
@Controller('common/country')
export class CommonFindCountryByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find country by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CountryDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        return await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));
    }
}