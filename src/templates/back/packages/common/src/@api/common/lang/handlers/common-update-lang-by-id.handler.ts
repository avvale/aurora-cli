import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';

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
        auditing?: AuditingMeta,
    ): Promise<CommonLang | CommonLangDto>
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, lang);

        await this.commandBus.dispatch(new UpdateLangByIdCommand(
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

        return await this.queryBus.ask(new FindLangByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}