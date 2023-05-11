import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { DeleteAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2/application/delete/delete-administrative-areas-level-2.command';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[] | CommonAdministrativeAreaLevel2Dto[]>
    {
        const administrativeAreasLevel2 = await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel2Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel2;
    }
}