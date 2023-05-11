import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel2ByIdQuery } from '@app/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { UpdateAdministrativeAreaLevel2ByIdCommand } from '@app/common/administrative-area-level-2/application/update/update-administrative-area-level-2-by-id.command';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';
import { CommonAdministrativeAreaLevel2Dto, CommonUpdateAdministrativeAreaLevel2ByIdDto } from '../dto';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel2ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreaLevel2ByIdInput | CommonUpdateAdministrativeAreaLevel2ByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel2ByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, constraint, { timezone }));
    }
}