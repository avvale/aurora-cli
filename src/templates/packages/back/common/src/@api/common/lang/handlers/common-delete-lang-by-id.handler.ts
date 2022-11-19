import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindLangByIdQuery } from '@apps/common/lang/application/find/find-lang-by-id.query';
import { DeleteLangByIdCommand } from '@apps/common/lang/application/delete/delete-lang-by-id.command';
import { CommonLang } from '@api/graphql';
import { CommonLangDto } from '../dto';

@Injectable()
export class CommonDeleteLangByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang | CommonLangDto>
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteLangByIdCommand(id, constraint, { timezone }));

        return lang;
    }
}