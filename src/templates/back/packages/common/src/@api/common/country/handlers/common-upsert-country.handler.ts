import { Injectable } from '@nestjs/common';
import { AuditingMeta, AddI18nConstraintService, FormatLangCode, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindCountryByIdQuery } from '@app/common/country/application/find/find-country-by-id.query';
import { UpsertCountryCommand } from '@app/common/country/application/upsert/upsert-country.command';
import { CommonCountry, CommonUpdateCountryByIdInput } from '@api/graphql';
import { CommonCountryDto, CommonUpdateCountryByIdDto } from '../dto';

@Injectable()
export class CommonUpsertCountryHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        payload: CommonUpdateCountryByIdInput | CommonUpdateCountryByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        await this.commandBus.dispatch(new UpsertCountryCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        const constraint = await this.addI18nConstraintService.main(
            {},
            'countryI18n',
            payload.langId,
            { contentLanguageFormat: FormatLangCode.ID },
        );
        return await this.queryBus.ask(new FindCountryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}