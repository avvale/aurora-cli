import { IamAddPermissionsRolesContextEvent, IamIPermissionRoleRepository } from '@app/iam/permission-role';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeletePermissionsRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const permissionsRoles = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (permissionsRoles.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddPermissionsRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRolesRegistered = this.publisher.mergeObjectContext(
            new IamAddPermissionsRolesContextEvent(permissionsRoles),
        );

        permissionsRolesRegistered.deleted(); // apply event to model events
        permissionsRolesRegistered.commit(); // commit all events of model
    }
}
