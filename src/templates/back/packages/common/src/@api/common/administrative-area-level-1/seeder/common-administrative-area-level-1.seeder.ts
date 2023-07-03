import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CommonCreateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';

@Injectable()
export class CommonAdministrativeAreaLevel1Seeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreasLevel1Command(
            commonMockAdministrativeAreaLevel1Data,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}