import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CommonCreateResourcesCommand } from '@app/common/resource';
import { commonMockResourceData } from '@app/common/resource';

@Injectable()
export class CommonResourceSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateResourcesCommand(
            commonMockResourceData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
