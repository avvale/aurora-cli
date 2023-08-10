import { IamAddPermissionsRolesContextEvent, IamIPermissionRoleRepository, IamPermissionRole } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';

@Injectable()
export class IamCreatePermissionsRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    public async main(
        permissionsRoles: {
            permissionId: IamPermissionRolePermissionId;
            roleId: IamPermissionRoleRoleId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregatePermissionsRoles = permissionsRoles.map(permissionRole => IamPermissionRole.register(
            permissionRole.permissionId,
            permissionRole.roleId,
        ));

        // insert
        await this.repository.insert(aggregatePermissionsRoles, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddPermissionsRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRolesRegistered = this.publisher.mergeObjectContext(new IamAddPermissionsRolesContextEvent(aggregatePermissionsRoles));

        permissionsRolesRegistered.created(); // apply event to model events
        permissionsRolesRegistered.commit(); // commit all events of model
    }
}