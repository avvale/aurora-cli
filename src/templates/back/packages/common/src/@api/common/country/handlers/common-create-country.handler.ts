import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus } from '@aurora-ts/core';

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
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        payload: CommonCreateCountryInput | CommonCreateCountryDto,
        timezone?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        await this.commandBus.dispatch(new CreateCountryCommand(payload, { timezone }));

        const constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}