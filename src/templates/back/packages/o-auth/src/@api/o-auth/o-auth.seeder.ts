// ignored file
import {
    applications,
    boundedContexts,
    clients,
    permissions,
} from '@app/o-auth/o-auth.seed';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

// sources
import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import {
    IamCreatePermissionsCommand,
    IamPermissionHelper,
} from '@app/iam/permission';
import { OAuthCreateApplicationsCommand } from '@app/o-auth/application';
import { OAuthCreateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthCreateClientsCommand } from '@app/o-auth/client';

@Injectable()
export class OAuthSeeder implements OnApplicationBootstrap {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean> {
        // create administrator permissions
        await IamPermissionHelper.createAdministratorPermissions(
            this.commandBus,
            this.queryBus,
            permissions,
        );

        // create oauth applications
        await this.commandBus.dispatch(
            new OAuthCreateApplicationsCommand(applications),
        );

        // create oauth clients
        await this.commandBus.dispatch(new OAuthCreateClientsCommand(clients));

        await this.commandBus.dispatch(
            new OAuthCreateApplicationsClientsCommand([
                {
                    applicationId: applications[0].id,
                    clientId: clients[0].id,
                },
            ]),
        );

        return true;
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.commandBus.dispatch(
            new IamCreateBoundedContextsCommand(boundedContexts, {
                timezone: process.env.TZ,
                repositoryOptions: {
                    updateOnDuplicate: ['name', 'root', 'sort', 'isActive'],
                    conflictAttributes: ['id'],
                },
            }),
        );
        void this.commandBus.dispatch(
            new IamCreatePermissionsCommand(permissions, {
                timezone: process.env.TZ,
                repositoryOptions: {
                    updateOnDuplicate: ['name', 'boundedContextId'],
                    conflictAttributes: ['id'],
                },
            }),
        );
    }
}
