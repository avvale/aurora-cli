import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { UpdateAdministrativeAreaLevel3ByIdCommand } from '@app/common/administrative-area-level-3/application/update/update-administrative-area-level-3-by-id.command';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreaLevel3ByIdDto } from '../dto';

@Injectable()
export class CommonUpdateAdministrativeAreaLevel3ByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateAdministrativeAreaLevel3ByIdInput | CommonUpdateAdministrativeAreaLevel3ByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel3ByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, constraint, { timezone }));
    }
}