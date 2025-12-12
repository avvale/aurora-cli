import {
    IamBoundedContext,
    IamUpdateBoundedContextByIdInput,
} from '@api/graphql';
import {
    IamBoundedContextDto,
    IamUpdateBoundedContextByIdDto,
} from '@api/iam/bounded-context';
import {
    IamFindBoundedContextByIdQuery,
    IamUpdateBoundedContextByIdCommand,
} from '@app/iam/bounded-context';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamUpdateBoundedContextByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload:
            | IamUpdateBoundedContextByIdInput
            | IamUpdateBoundedContextByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto> {
        const boundedContext = await this.queryBus.ask(
            new IamFindBoundedContextByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        if (!boundedContext)
            throw new NotFoundException(
                `IamBoundedContext with id: ${payload.id}, not found`,
            );

        const dataToUpdate = diff(payload, boundedContext);

        await this.commandBus.dispatch(
            new IamUpdateBoundedContextByIdCommand(
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
            ),
        );

        return await this.queryBus.ask(
            new IamFindBoundedContextByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
