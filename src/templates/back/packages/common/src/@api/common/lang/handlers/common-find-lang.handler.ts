import { CommonLangDto } from '@api/common/lang';
import { CommonLang } from '@api/graphql';
import { CommonFindLangQuery } from '@app/common/lang';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new CommonFindLangQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}