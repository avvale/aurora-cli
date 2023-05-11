import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonFindAdministrativeAreaLevel3ByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(id, constraint, { timezone }));
    }
}