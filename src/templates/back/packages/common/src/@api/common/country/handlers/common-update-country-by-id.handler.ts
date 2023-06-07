import { Injectable } from '@nestjs/common';
import { AuditingMeta, AddI18nConstraintService, FormatLangCode, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';

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
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        payload: CommonUpdateCountryByIdInput | CommonUpdateCountryByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        const country = await this.queryBus.ask(new FindCountryByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, country);

        await this.commandBus.dispatch(new UpdateCountryByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        constraint = await this.addI18nConstraintService.main(
            {},
            'countryI18n',
            payload.langId,
            {
                contentLanguageFormat: FormatLangCode.ID,
            },
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