import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { FindBoundedContextByIdQuery } from '@app/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { CreateBoundedContextCommand } from '@app/iam/bounded-context/application/create/create-bounded-context.command';
import { IamBoundedContext, IamCreateBoundedContextInput } from '@api/graphql';
import { IamBoundedContextDto, IamCreateBoundedContextDto } from '../dto';

@Injectable()
export class IamCreateBoundedContextHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateBoundedContextInput | IamCreateBoundedContextDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new CreateBoundedContextCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, {}, { timezone }));
    }
}