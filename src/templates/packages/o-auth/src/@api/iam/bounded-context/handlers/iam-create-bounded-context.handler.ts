import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { CreateBoundedContextCommand } from '../../../../@apps/iam/bounded-context/application/create/create-bounded-context.command';
import { IamBoundedContext, IamCreateBoundedContextInput } from '../../../../graphql';
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
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new CreateBoundedContextCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, {}, { timezone }));
    }
}