import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { UpdateBoundedContextCommand } from '../../../../@apps/iam/bounded-context/application/update/update-bounded-context.command';
import { IamBoundedContext, IamUpdateBoundedContextInput } from '../../../../graphql';
import { IamBoundedContextDto, IamUpdateBoundedContextDto } from '../dto';

@Injectable()
export class IamUpdateBoundedContextHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateBoundedContextInput | IamUpdateBoundedContextDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new UpdateBoundedContextCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, constraint, { timezone }));
    }
}