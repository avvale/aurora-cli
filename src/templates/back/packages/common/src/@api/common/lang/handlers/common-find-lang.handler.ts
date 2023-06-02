import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindLangQuery } from '@app/common/lang/application/find/find-lang.query';
import { CommonLang } from '@api/graphql';
import { CommonLangDto } from '../dto';

@Injectable()
export class CommonFindLangHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang | CommonLangDto>
    {
        return await this.queryBus.ask(new FindLangQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}