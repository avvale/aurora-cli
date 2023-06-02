import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindLangByIdQuery } from '@app/common/lang/application/find/find-lang-by-id.query';
import { CommonLang } from '@api/graphql';
import { CommonLangDto } from '../dto';

@Injectable()
export class CommonFindLangByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang | CommonLangDto>
    {
        return await this.queryBus.ask(new FindLangByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}