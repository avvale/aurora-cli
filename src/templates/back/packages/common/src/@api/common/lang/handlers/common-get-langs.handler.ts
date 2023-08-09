import { CommonLangDto } from '@api/common/lang';
import { CommonLang } from '@api/graphql';
import { CommonGetLangsQuery } from '@app/common/lang';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetLangsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang[] | CommonLangDto[]>
    {
        return await this.queryBus.ask(new CommonGetLangsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
