import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetLangsQuery } from '@app/common/lang/application/get/get-langs.query';
import { UpdateLangsCommand } from '@app/common/lang/application/update/update-langs.command';
import { CommonLang, CommonUpdateLangsInput } from '@api/graphql';
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