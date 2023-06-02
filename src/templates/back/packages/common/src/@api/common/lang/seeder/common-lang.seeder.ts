import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateLangsCommand } from '@app/common/lang/application/create/create-langs.command';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

@Injectable()
export class CommonLangSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateLangsCommand(
            langs,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}