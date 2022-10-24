import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateAdministrativeAreasLevel3Command } from '@apps/common/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';
import { CommonCreateAdministrativeAreaLevel3Input } from 'src/graphql';
import { CommonCreateAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonCreateAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel3Input[] | CommonCreateAdministrativeAreaLevel3Dto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(payload, { timezone }));
        return true;
    }
}