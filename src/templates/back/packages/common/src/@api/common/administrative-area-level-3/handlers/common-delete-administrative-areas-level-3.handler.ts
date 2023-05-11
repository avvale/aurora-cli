import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';
import { DeleteAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3/application/delete/delete-administrative-areas-level-3.command';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3[] | CommonAdministrativeAreaLevel3Dto[]>
    {
        const administrativeAreasLevel3 = await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel3Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel3;
    }
}