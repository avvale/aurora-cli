import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel2ByIdQuery } from '@app/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { DeleteAdministrativeAreaLevel2ByIdCommand } from '@app/common/administrative-area-level-2/application/delete/delete-administrative-area-level-2-by-id.command';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel2ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        const administrativeAreaLevel2 = await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel2ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel2;
    }
}