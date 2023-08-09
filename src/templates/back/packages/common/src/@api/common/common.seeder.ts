import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
// import { CreatePermissionsCommand } from '@app/iam/permission/application/create/create-permissions.command';
// import { CreateBoundedContextsCommand } from '@app/iam/bounded-context/application/create/create-bounded-contexts.command';
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
        // await this.commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
        // await this.commandBus.dispatch(new CreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

        return true;
    }
}
