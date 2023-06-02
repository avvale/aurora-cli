import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindLangByIdQuery } from '@app/common/lang/application/find/find-lang-by-id.query';
import { CreateLangCommand } from '@app/common/lang/application/create/create-lang.command';
import { CommonLang, CommonCreateLangInput } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<CommonLang | CommonLangDto>
    {
        await this.commandBus.dispatch(new CreateLangCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindLangByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}