import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
// import { IamCreatePermissionsCommand } from '@app/iam/permission';
// import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { boundedContexts, permissions } from '@app/common/common.seed';

@Injectable()
export class CommonSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        // await this.commandBus.dispatch(new IamCreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
        // await this.commandBus.dispatch(new IamCreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

        return true;
    }
}
