import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AddI18NConstraintService, ContentLanguage, ICommandBus, IQueryBus, QueryStatement, Timezone } from '@aurora-ts/core';
import { CountryDto } from '../dto/country.dto';

// @apps
import { FindCountryByIdQuery } from '@apps/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdI18NCommand } from '@apps/common/country/application/delete/delete-country-by-id-i18n.command';

@ApiTags('[common] country')
@Controller('common/country-i18n')
export class CommonDeleteCountryByIdI18NController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete country by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CountryDto })
    async main(
        @Param('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        const country = await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountryByIdI18NCommand(id, constraint, { timezone }));

        return country;
    }
}