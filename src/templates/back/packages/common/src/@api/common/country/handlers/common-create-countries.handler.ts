import { Injectable } from '@nestjs/common';
import { AuditingMeta, AddI18nConstraintService, ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateCountriesCommand } from '@app/common/country/application/create/create-countries.command';
import { CommonCreateCountryInput } from '@api/graphql';
import { CommonCreateCountryDto } from '../dto';

@Injectable()
export class CommonCreateCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        payload: CommonCreateCountryInput[] | CommonCreateCountryDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        return true;
    }
}