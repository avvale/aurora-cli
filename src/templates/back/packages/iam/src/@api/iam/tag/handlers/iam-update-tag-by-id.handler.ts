import { IamTag, IamUpdateTagByIdInput } from '@api/graphql';
import { IamTagDto, IamUpdateTagByIdDto } from '@api/iam/tag';
import { IamFindTagByIdQuery, IamUpdateTagByIdCommand } from '@app/iam/tag';
import { AuditingMeta, diff, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateTagByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTagByIdInput | IamUpdateTagByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTag | IamTagDto>
    {
        const tag = await this.queryBus.ask(new IamFindTagByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, tag);

        await this.commandBus.dispatch(new IamUpdateTagByIdCommand(
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

        return await this.queryBus.ask(new IamFindTagByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
