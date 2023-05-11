import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindLangByIdQuery } from '@app/common/lang/application/find/find-lang-by-id.query';
import { UpdateLangByIdCommand } from '@app/common/lang/application/update/update-lang-by-id.command';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';
import { CommonLangDto, CommonUpdateLangByIdDto } from '../dto';

@Injectable()
export class CommonUpdateLangByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateLangByIdInput | CommonUpdateLangByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonLang | CommonLangDto>
    {
        await this.commandBus.dispatch(new UpdateLangByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint, { timezone }));
    }
}