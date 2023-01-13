import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// @app
import { CreateBoundedContextsCommand } from '@app/iam/bounded-context/application/create/create-bounded-contexts.command';
import { IamCreateBoundedContextInput } from '@api/graphql';
import { IamCreateBoundedContextDto } from '../dto';

@Injectable()
export class IamCreateBoundedContextsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateBoundedContextInput[] | IamCreateBoundedContextDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload, { timezone }));
        return true;
    }
}