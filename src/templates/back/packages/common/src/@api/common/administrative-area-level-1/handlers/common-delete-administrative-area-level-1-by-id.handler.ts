import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel1ByIdQuery } from '@app/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { DeleteAdministrativeAreaLevel1ByIdCommand } from '@app/common/administrative-area-level-1/application/delete/delete-administrative-area-level-1-by-id.command';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel1ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        const administrativeAreaLevel1 = await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel1ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel1;
    }
}