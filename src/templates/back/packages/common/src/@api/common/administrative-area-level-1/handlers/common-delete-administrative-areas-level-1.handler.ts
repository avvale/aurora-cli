import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1/application/get/get-administrative-areas-level-1.query';
import { DeleteAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1/application/delete/delete-administrative-areas-level-1.command';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

@Injectable()
export class CommonDeleteAdministrativeAreasLevel1Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1[] | CommonAdministrativeAreaLevel1Dto[]>
    {
        const administrativeAreasLevel1 = await this.queryBus.ask(new GetAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel1Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel1;
    }
}