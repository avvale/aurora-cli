import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindLangByIdQuery } from '@apps/common/lang/application/find/find-lang-by-id.query';
import { CreateLangCommand } from '@apps/common/lang/application/create/create-lang.command';
import { CommonLang, CommonCreateLangInput } from '../../../../graphql';
import { CommonLangDto, CommonCreateLangDto } from '../dto';

@Injectable()
export class CommonCreateLangHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateLangInput | CommonCreateLangDto,
        timezone?: string,
    ): Promise<CommonLang | CommonLangDto>
    {
        await this.commandBus.dispatch(new CreateLangCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, {}, { timezone }));
    }
}