import {
    IamAddPermissionsContextEvent,
    IamIPermissionRepository,
    IamPermission,
} from '@app/iam/permission';
import {
    IamPermissionBoundedContextId,
    IamPermissionCreatedAt,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionUpdatedAt,
} from '@app/iam/permission/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreatePermissionsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        payload: {
            id: IamPermissionId;
            name: IamPermissionName;
            boundedContextId: IamPermissionBoundedContextId;
            roleIds: IamPermissionRoleIds;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const permissions = payload.map((permission) =>
            IamPermission.register(
                permission.id,
                undefined, // rowId
                permission.name,
                permission.boundedContextId,
                permission.roleIds,
                new IamPermissionCreatedAt({ currentTimestamp: true }),
                new IamPermissionUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(permissions, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddPermissionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRegistered = this.publisher.mergeObjectContext(
            new IamAddPermissionsContextEvent(permissions, cQMetadata),
        );

        permissionsRegistered.created(); // apply event to model events
        permissionsRegistered.commit(); // commit all events of model
    }
}
