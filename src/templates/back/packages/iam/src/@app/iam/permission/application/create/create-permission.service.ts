import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';
import {
    PermissionBoundedContextId,
    PermissionCreatedAt,
    PermissionDeletedAt,
    PermissionId,
    PermissionName,
    PermissionRoleIds,
    PermissionUpdatedAt,
} from '../../domain/value-objects';

@Injectable()
export class CreatePermissionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository,
    ) {}

    async main(
        payload: {
            id: PermissionId;
            name: PermissionName;
            boundedContextId: PermissionBoundedContextId;
            roleIds: PermissionRoleIds;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const permission = IamPermission.register(
            payload.id,
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            new PermissionCreatedAt({ currentTimestamp: true }),
            new PermissionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(permission, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionRegister = this.publisher.mergeObjectContext(
            permission,
        );

        permissionRegister.created(permission); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}