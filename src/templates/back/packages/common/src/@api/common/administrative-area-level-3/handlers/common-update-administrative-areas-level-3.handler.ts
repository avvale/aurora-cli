import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';
import { UpdateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3/application/update/update-administrative-areas-level-3.command';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreasLevel3Dto } from '../dto';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreasLevel3Input | CommonUpdateAdministrativeAreasLevel3Dto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreasLevel3Command(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));
    }
}