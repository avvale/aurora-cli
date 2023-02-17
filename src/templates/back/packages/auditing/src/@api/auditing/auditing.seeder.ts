import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';
// import { CreatePermissionsCommand } from '@app/iam/permission/application/create/create-permissions.command';
// import { CreateBoundedContextsCommand } from '@app/iam/bounded-context/application/create/create-bounded-contexts.command';
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
        // await this.commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
        // await this.commandBus.dispatch(new CreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

        return true;
    }
}