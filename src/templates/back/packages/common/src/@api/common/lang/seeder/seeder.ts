import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateLangsCommand } from '@app/common/lang/application/create/create-langs.command';
import { SeederModule } from './seeder.module';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateLangsCommand(langs, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();