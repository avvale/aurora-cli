import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { CommonCreateAdministrativeAreaLevel1Dto } from '../dto';

@Injectable()
export class CommonCreateAdministrativeAreasLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel1Input[] | CommonCreateAdministrativeAreaLevel1Dto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(payload, { timezone }));
        return true;
    }
}