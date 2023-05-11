import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { CommonCreateAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonCreateAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel2Input[] | CommonCreateAdministrativeAreaLevel2Dto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel2Command(payload, { timezone }));
        return true;
    }
}