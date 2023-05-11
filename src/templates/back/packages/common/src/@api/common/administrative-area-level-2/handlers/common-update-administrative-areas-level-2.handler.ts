import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { UpdateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2/application/update/update-administrative-areas-level-2.command';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreasLevel2Input } from '@api/graphql';
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreasLevel2Dto } from '../dto';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreasLevel2Input | CommonUpdateAdministrativeAreasLevel2Dto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreasLevel2Command(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}