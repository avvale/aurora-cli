import { Injectable } from '@nestjs/common';
import { AddI18nConstraintService, FormatLangCode, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindCountryByIdQuery } from '@app/common/country/application/find/find-country-by-id.query';
import { CreateCountryCommand } from '@app/common/country/application/create/create-country.command';
import { CommonCountry, CommonCreateCountryInput } from '@api/graphql';
import { CommonCountryDto, CommonCreateCountryDto } from '../dto';

@Injectable()
export class CommonCreateCountryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        payload: CommonCreateCountryInput | CommonCreateCountryDto,
        timezone?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        await this.commandBus.dispatch(new CreateCountryCommand(payload, { timezone }));

        const constraint = await this.addI18nConstraintService.main({}, 'countryI18n', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}