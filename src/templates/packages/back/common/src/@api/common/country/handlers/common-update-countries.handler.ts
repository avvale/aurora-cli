import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetCountriesQuery } from '@app/common/country/application/get/get-countries.query';
import { UpdateCountriesCommand } from '@app/common/country/application/update/update-countries.command';
import { CommonCountry, CommonUpdateCountriesInput } from '@api/graphql';
import { CommonCountryDto, CommonUpdateCountriesDto } from '../dto';

@Injectable()
export class CommonUpdateCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        payload: CommonUpdateCountriesInput | CommonUpdateCountriesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        await this.commandBus.dispatch(new UpdateCountriesCommand(payload, queryStatement, constraint, { timezone }));

        constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));
    }
}