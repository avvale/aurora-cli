import { CommonLangDto, CommonUpdateLangByIdDto } from '@api/common/lang';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';
import { CommonFindLangByIdQuery, CommonUpsertLangCommand } from '@app/common/lang';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpsertLangHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonUpdateLangByIdInput | CommonUpdateLangByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonLang | CommonLangDto>
    {
        await this.commandBus.dispatch(new CommonUpsertLangCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindLangByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}