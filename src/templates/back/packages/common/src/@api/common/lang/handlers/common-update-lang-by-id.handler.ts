import { CommonLangDto, CommonUpdateLangByIdDto } from '@api/common/lang';
import { CommonLang, CommonUpdateLangByIdInput } from '@api/graphql';
import { CommonFindLangByIdQuery, CommonUpdateLangByIdCommand } from '@app/common/lang';
import { AuditingMeta, CoreGetLangsService, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonUpdateLangByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly coreGetLangsService: CoreGetLangsService,
    ) {}

    async main(
        payload: CommonUpdateLangByIdInput | CommonUpdateLangByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonLang | CommonLangDto>
    {
        const lang = await this.queryBus.ask(new CommonFindLangByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, lang);

        await this.commandBus.dispatch(new CommonUpdateLangByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        // init cache langs to update langs
        await this.coreGetLangsService.init();

        return await this.queryBus.ask(new CommonFindLangByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
