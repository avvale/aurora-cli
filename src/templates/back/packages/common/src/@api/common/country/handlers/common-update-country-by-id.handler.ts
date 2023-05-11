import { Injectable } from '@nestjs/common';
import { AddI18NConstraintService, FormatLangCode, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindCountryByIdQuery } from '@app/common/country/application/find/find-country-by-id.query';
import { UpdateCountryByIdCommand } from '@app/common/country/application/update/update-country-by-id.command';
import { CommonCountry, CommonUpdateCountryByIdInput } from '@api/graphql';
import { CommonCountryDto, CommonUpdateCountryByIdDto } from '../dto';

@Injectable()
export class CommonUpdateCountryByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    async main(
        payload: CommonUpdateCountryByIdInput | CommonUpdateCountryByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        await this.commandBus.dispatch(new UpdateCountryByIdCommand(payload, constraint, { timezone }));

        constraint = await this.addI18NConstraintService.main({}, 'countryI18N', payload.langId, { contentLanguageFormat: FormatLangCode.ID });
        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}