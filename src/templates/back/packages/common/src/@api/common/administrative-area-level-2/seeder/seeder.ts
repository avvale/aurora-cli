import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(administrativeAreasLevel2, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();