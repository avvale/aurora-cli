import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '@api/iam/bounded-context';
import { IamFindBoundedContextByIdQuery, IamUpsertBoundedContextCommand } from '@app/iam/bounded-context';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertBoundedContextHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateBoundedContextByIdInput | IamUpdateBoundedContextByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new IamUpsertBoundedContextCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindBoundedContextByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
