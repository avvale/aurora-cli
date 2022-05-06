import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateLangsCommand } from '../../../../@apps/common/lang/application/create/create-langs.command';
import { SeederModule } from './seeder.module';
import { langs } from '../../../../@apps/common/lang/infrastructure/seeds/lang.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateLangsCommand(langs));
        });
    }
}
new Seeder().main();