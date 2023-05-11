import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(administrativeAreasLevel3, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();