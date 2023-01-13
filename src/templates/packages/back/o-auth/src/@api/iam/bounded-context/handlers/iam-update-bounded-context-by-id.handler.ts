import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

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
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new UpdateBoundedContextByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, constraint, { timezone }));
    }
}