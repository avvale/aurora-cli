import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';
import { AddPermissionsRolesContextEvent } from '../events/add-permissions-roles-context.event';

@Injectable()
export class CreatePermissionsRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRoleRepository,
    ) {}

    public async main(
        permissionsRoles: {
            permissionId: PermissionRolePermissionId;
            roleId: PermissionRoleRoleId;
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
        const permissionsRolesRegistered = this.publisher.mergeObjectContext(new AddPermissionsRolesContextEvent(aggregatePermissionsRoles));

        permissionsRolesRegistered.created(); // apply event to model events
        permissionsRolesRegistered.commit(); // commit all events of model
    }
}