import { IamTag, IamUpdateTagByIdInput } from '@api/graphql';
import { IamTagDto, IamUpdateTagByIdDto } from '@api/iam/tag';
import { IamFindTagByIdQuery, IamUpsertTagCommand } from '@app/iam/tag';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertTagHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTagByIdInput | IamUpdateTagByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTag | IamTagDto>
    {
        await this.commandBus.dispatch(new IamUpsertTagCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindTagByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
