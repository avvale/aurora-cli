import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, AddI18NConstraintService, ContentLanguage, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { CountryDto } from './../dto/country.dto';

// @apps
import { GetCountriesQuery } from '../../../../@apps/common/country/application/get/get-countries.query';

@ApiTags('[common] country')
@Controller('common/countries')
export class CommonGetCountriesController
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find countries according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CountryDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage, { defineDefaultLanguage: false });
        return await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));
    }
}