import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1/application/get/get-administrative-areas-level-1.query';
import { UpdateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1/application/update/update-administrative-areas-level-1.command';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';
import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreasLevel1Dto } from '../dto';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreasLevel1Input | CommonUpdateAdministrativeAreasLevel1Dto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreasLevel1Command(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));
    }
}