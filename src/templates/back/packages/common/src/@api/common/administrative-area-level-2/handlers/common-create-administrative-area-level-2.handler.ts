import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel2ByIdQuery } from '@app/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { CreateAdministrativeAreaLevel2Command } from '@app/common/administrative-area-level-2/application/create/create-administrative-area-level-2.command';
import { CommonAdministrativeAreaLevel2, CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { CommonAdministrativeAreaLevel2Dto, CommonCreateAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonCreateAdministrativeAreaLevel2Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel2Input | CommonCreateAdministrativeAreaLevel2Dto,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel2Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, {}, { timezone }));
    }
}