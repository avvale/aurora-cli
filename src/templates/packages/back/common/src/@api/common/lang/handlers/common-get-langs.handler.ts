import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetLangsQuery } from '@apps/common/lang/application/get/get-langs.query';
import { CommonLang } from 'src/graphql';
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
        return await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint, { timezone }));
    }
}