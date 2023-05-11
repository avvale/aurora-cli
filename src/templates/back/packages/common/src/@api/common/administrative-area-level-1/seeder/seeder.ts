import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(administrativeAreasLevel1, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();