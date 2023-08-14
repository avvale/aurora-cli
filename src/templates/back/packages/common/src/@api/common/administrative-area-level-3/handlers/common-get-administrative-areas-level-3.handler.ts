import { CommonAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3[] | CommonAdministrativeAreaLevel3Dto[]>
    {
        return await this.queryBus.ask(new CommonGetAdministrativeAreasLevel3Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
