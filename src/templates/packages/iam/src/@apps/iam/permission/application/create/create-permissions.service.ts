import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';
import { AddPermissionsContextEvent } from '../events/add-permissions-context.event';

@Injectable()
export class CreatePermissionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository,
    ) {}

    async main(
        permissions: {
            id: PermissionId;
            name: PermissionName;
            boundedContextId: PermissionBoundedContextId;
            roleIds: PermissionRoleIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregatePermissions = permissions.map(permission => IamPermission.register(
            permission.id,
            permission.name,
            permission.boundedContextId,
            permission.roleIds,
            new PermissionCreatedAt({ currentTimestamp: true }),
            new PermissionUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregatePermissions, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddPermissionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRegistered = this.publisher.mergeObjectContext(new AddPermissionsContextEvent(aggregatePermissions));

        permissionsRegistered.created(); // apply event to model events
        permissionsRegistered.commit(); // commit all events of model
    }
}