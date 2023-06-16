import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CommonCreateLangsCommand } from '@app/common/lang';
import { commonLangs } from '@app/common/lang';

@Injectable()
export class CommonLangSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateLangsCommand(
            commonLangs,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}