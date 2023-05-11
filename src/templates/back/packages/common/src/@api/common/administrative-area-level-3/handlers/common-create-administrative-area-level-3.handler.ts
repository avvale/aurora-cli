import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { CreateAdministrativeAreaLevel3Command } from '@app/common/administrative-area-level-3/application/create/create-administrative-area-level-3.command';
import { CommonAdministrativeAreaLevel3, CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto, CommonCreateAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonCreateAdministrativeAreaLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel3Input | CommonCreateAdministrativeAreaLevel3Dto,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel3Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, {}, { timezone }));
    }
}