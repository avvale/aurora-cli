import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel1ByIdQuery } from '@app/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { UpdateAdministrativeAreaLevel1ByIdCommand } from '@app/common/administrative-area-level-1/application/update/update-administrative-area-level-1-by-id.command';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';
import { CommonAdministrativeAreaLevel1Dto, CommonUpdateAdministrativeAreaLevel1ByIdDto } from '../dto';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel1ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreaLevel1ByIdInput | CommonUpdateAdministrativeAreaLevel1ByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel1ByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, { timezone }));
    }
}