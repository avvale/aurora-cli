import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';

@Injectable()
export class IamBoundedContextSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateBoundedContextsCommand(
            iamMockBoundedContextData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
