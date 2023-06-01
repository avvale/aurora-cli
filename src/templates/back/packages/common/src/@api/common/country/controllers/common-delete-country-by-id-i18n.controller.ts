import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AddI18nConstraintService, ContentLanguage, ICommandBus, IQueryBus, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { CountryDto } from '../dto/country.dto';

// @app
import { FindCountryByIdQuery } from '@app/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdI18nCommand } from '@app/common/country/application/delete/delete-country-by-id-i18n.command';

@ApiTags('[common] country')
@Controller('common/country-i18n')
export class CommonDeleteCountryByIdI18nController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
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
        constraint = await this.addI18nConstraintService.main(constraint, 'countryI18n', contentLanguage);
        const country = await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountryByIdI18nCommand(id, constraint, { timezone }));

        return country;
    }
}