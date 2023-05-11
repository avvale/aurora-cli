import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { DeleteAdministrativeAreaLevel3ByIdCommand } from '@app/common/administrative-area-level-3/application/delete/delete-administrative-area-level-3-by-id.command';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonDeleteAdministrativeAreaLevel3ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        const administrativeAreaLevel3 = await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel3ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel3;
    }
}