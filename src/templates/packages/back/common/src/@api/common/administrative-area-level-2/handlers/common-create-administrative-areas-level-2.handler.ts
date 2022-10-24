import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateAdministrativeAreasLevel2Command } from '@apps/common/administrative-area-level-2/application/create/create-administrative-areas-level-2.command';
import { CommonCreateAdministrativeAreaLevel2Input } from 'src/graphql';
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