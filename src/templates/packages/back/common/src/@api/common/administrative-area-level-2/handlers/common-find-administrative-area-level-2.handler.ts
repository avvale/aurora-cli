import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel2Query } from '@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2.query';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonFindAdministrativeAreaLevel2Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel2Query(queryStatement, constraint, { timezone }));
    }
}