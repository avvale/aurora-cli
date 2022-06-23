import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetLangsQuery } from '@apps/common/lang/application/get/get-langs.query';
import { DeleteLangsCommand } from '@apps/common/lang/application/delete/delete-langs.command';
import { CommonLang } from '../../../../graphql';
import { CommonLangDto } from '../dto';

@Injectable()
export class CommonDeleteLangsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang[] | CommonLangDto[]>
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatement, constraint, { timezone }));

        return langs;
    }
}