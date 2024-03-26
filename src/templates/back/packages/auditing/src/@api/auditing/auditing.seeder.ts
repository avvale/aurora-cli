// ignored file
import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
// import { IamCreatePermissionsCommand } from '@app/iam/permission';
// import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { boundedContexts, permissions } from '@app/auditing/auditing.seed';

@Injectable()
export class AuditingSeeder
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