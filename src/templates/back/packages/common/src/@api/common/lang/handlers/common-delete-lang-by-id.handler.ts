import { CommonLangDto } from '@api/common/lang';
import { CommonLang } from '@api/graphql';
import { CommonDeleteLangByIdCommand, CommonFindLangByIdQuery } from '@app/common/lang';
import { AuditingMeta, CoreGetLangsService, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteLangByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly coreGetLangsService: CoreGetLangsService,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonLang | CommonLangDto>
    {
        const lang = await this.queryBus.ask(new CommonFindLangByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteLangByIdCommand(
            id,
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

        return lang;
    }
}
