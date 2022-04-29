import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateBoundedContextsCommand } from '../../../../@apps/iam/bounded-context/application/create/create-bounded-contexts.command';
import { IamCreateBoundedContextInput } from '../../../../graphql';
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