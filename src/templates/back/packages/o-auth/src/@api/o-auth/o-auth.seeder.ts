// ignored file
import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { applications, boundedContexts, clients, permissions } from '@app/o-auth/o-auth.seed';

// sources
import { IamBoundedContextHelper } from '@app/iam/bounded-context';
import { IamPermissionHelper } from '@app/iam/permission';
import { OAuthCreateApplicationsCommand } from '@app/o-auth/application';
import { OAuthCreateClientsCommand } from '@app/o-auth/client';

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
        await IamBoundedContextHelper.createBoundedContexts(this.commandBus, boundedContexts);
        await IamPermissionHelper.createPermissions(this.commandBus, this.queryBus, permissions);

        // create oauth applications
        await this.commandBus.dispatch(new OAuthCreateApplicationsCommand(applications));

        // create oauth clients
        await this.commandBus.dispatch(new OAuthCreateClientsCommand(clients));

        return true;
    }
}