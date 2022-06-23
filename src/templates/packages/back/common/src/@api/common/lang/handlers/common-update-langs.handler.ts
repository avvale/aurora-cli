import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetLangsQuery } from '@apps/common/lang/application/get/get-langs.query';
import { UpdateLangsCommand } from '@apps/common/lang/application/update/update-langs.command';
import { CommonLang, CommonUpdateLangsInput } from '../../../../graphql';
import { CommonLangDto, CommonUpdateLangsDto } from '../dto';

@Injectable()
export class CommonUpdateLangsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateLangsInput | CommonUpdateLangsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang | CommonLangDto>
    {
        await this.commandBus.dispatch(new UpdateLangsCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint, { timezone }));
    }
}