import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel1ByIdQuery } from '@app/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { CreateAdministrativeAreaLevel1Command } from '@app/common/administrative-area-level-1/application/create/create-administrative-area-level-1.command';
import { CommonAdministrativeAreaLevel1, CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { CommonAdministrativeAreaLevel1Dto, CommonCreateAdministrativeAreaLevel1Dto } from '../dto';

@Injectable()
export class CommonCreateAdministrativeAreaLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel1Input | CommonCreateAdministrativeAreaLevel1Dto,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreaLevel1Command(payload, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, {}, { timezone }));
    }
}