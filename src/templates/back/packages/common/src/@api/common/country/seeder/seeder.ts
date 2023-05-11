import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateCountriesCommand } from '@app/common/country/application/create/create-countries.command';
import { SeederModule } from './seeder.module';
import { countries } from '@app/common/country/infrastructure/seeds/country.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateCountriesCommand(countries, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();