import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateAdministrativeAreasLevel2Command } from '../../../../@apps/common/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';
import { SeederModule } from './seeder.module';
import { administrativeAreasLevel2 } from '../../../../@apps/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(administrativeAreasLevel2));
        });
    }
}
new Seeder().main();