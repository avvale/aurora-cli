import { ICommandBus, SeederBoundedContext } from '@aurorajs.dev/core';
import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';

export class IamBoundedContextHelper
{
    static async createBoundedContexts(
        commandBus: ICommandBus,
        boundedContexts: SeederBoundedContext[],
    ): Promise<void>
    {
        // insert bounded contexts
        await commandBus.dispatch(new IamCreateBoundedContextsCommand(boundedContexts));
    }
}