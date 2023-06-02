import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetLangsQuery } from '@app/common/lang/application/get/get-langs.query';
import { CommonLang } from '@api/graphql';
import { CommonLangDto } from '../dto';

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
        return await this.queryBus.ask(new GetLangsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}