import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateCountriesCommand } from '@app/common/country/application/create/create-countries.command';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

@Injectable()
export class CommonCountrySeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(
            countries,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}