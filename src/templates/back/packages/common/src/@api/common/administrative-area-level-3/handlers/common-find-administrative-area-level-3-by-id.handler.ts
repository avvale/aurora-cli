import { CommonAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonFindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new CommonFindAdministrativeAreaLevel3ByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
