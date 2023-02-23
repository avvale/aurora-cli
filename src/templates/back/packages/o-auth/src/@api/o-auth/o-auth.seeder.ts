// ignored file
import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';
import { applications, boundedContexts, clients, permissions } from '@app/o-auth/o-auth.seed';

// sources
import { BoundedContextHelper } from '@app/iam/bounded-context/domain/bounded-context-helper';
import { PermissionHelper } from '@app/iam/permission/domain/permission-helper';
import { CreateApplicationsCommand } from '@app/o-auth/application/application/create/create-applications.command';
import { CreateClientsCommand } from '@app/o-auth/client/application/create/create-clients.command';

@Injectable()
export class OAuthSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        // create bounded contexts and permissions
        await BoundedContextHelper.createBoundedContexts(this.commandBus, boundedContexts);
        await PermissionHelper.createPermissions(this.commandBus, this.queryBus, permissions);

        // create oauth applications
        await this.commandBus.dispatch(new CreateApplicationsCommand(applications));

        // create oauth clients
        await this.commandBus.dispatch(new CreateClientsCommand(clients));

        return true;
    }
}