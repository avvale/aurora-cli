import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateCountryDto } from './../dto/update-country.dto';
import { CountryDto } from './../dto/country.dto';

// @apps
import { UpdateCountryCommand } from '../../../../@apps/common/country/application/update/update-country.command';
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';

@ApiTags('[common] country')
@Controller('common/country')
export class CommonUpdateCountryController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update country' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CountryDto})
    async main(
        @Body() payload: UpdateCountryDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateCountryCommand(payload, constraint, { timezone }));

        constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}