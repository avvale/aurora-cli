import {
    IamAddPermissionsRolesContextEvent,
    IamIPermissionRoleRepository,
    IamPermissionRole,
} from '@app/iam/permission-role';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreatePermissionsRolesService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        payload: {
            permissionId: IamPermissionRolePermissionId;
            roleId: IamPermissionRoleRoleId;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const permissionsRoles = payload.map((permissionRole) =>
            IamPermissionRole.register(
                permissionRole.permissionId,
                permissionRole.roleId,
            ),
        );

        // insert
        await this.repository.insert(permissionsRoles, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddPermissionsRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRolesRegistered = this.publisher.mergeObjectContext(
            new IamAddPermissionsRolesContextEvent(
                permissionsRoles,
                cQMetadata,
            ),
        );

        permissionsRolesRegistered.created(); // apply event to model events
        permissionsRolesRegistered.commit(); // commit all events of model
    }
}
