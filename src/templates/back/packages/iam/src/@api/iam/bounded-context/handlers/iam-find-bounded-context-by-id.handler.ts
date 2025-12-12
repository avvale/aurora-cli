import { IamBoundedContext } from '@api/graphql';
import { IamBoundedContextDto } from '@api/iam/bounded-context';
import { IamFindBoundedContextByIdQuery } from '@app/iam/bounded-context';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindBoundedContextByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto> {
        const boundedContext = await this.queryBus.ask(
            new IamFindBoundedContextByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!boundedContext)
            throw new NotFoundException(
                `IamBoundedContext with id: ${id}, not found`,
            );

        return boundedContext;
    }
}
