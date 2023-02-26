import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindBoundedContextByIdQuery } from '@app/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { UpdateBoundedContextByIdCommand } from '@app/iam/bounded-context/application/update/update-bounded-context-by-id.command';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '../dto';

@Injectable()
export class IamUpdateBoundedContextByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateBoundedContextByIdInput | IamUpdateBoundedContextByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, boundedContext);

        await this.commandBus.dispatch(new UpdateBoundedContextByIdCommand(
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

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}