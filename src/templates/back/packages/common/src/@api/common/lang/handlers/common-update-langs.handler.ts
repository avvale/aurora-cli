import { CommonLangDto, CommonUpdateLangsDto } from '@api/common/lang';
import { CommonLang, CommonUpdateLangsInput } from '@api/graphql';
import { CommonGetLangsQuery, CommonUpdateLangsCommand } from '@app/common/lang';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        auditing?: AuditingMeta,
    ): Promise<CommonLang | CommonLangDto>
    {
        await this.commandBus.dispatch(new CommonUpdateLangsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonGetLangsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
