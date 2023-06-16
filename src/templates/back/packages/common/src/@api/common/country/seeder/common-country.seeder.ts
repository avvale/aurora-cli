import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CommonCreateCountriesCommand } from '@app/common/country';
import { commonCountries } from '@app/common/country';

@Injectable()
export class CommonCountrySeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateCountriesCommand(
            commonCountries,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}