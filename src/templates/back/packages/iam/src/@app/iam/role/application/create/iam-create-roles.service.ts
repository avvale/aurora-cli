import {
    IamAddRolesContextEvent,
    IamIRoleRepository,
    IamRole,
} from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDefaultRedirection,
    IamRoleHasHiddenVerticalNavigation,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateRolesService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        payload: {
            id: IamRoleId;
            name: IamRoleName;
            defaultRedirection: IamRoleDefaultRedirection;
            hasHiddenVerticalNavigation: IamRoleHasHiddenVerticalNavigation;
            isMaster: IamRoleIsMaster;
            permissionIds: IamRolePermissionIds;
            accountIds: IamRoleAccountIds;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const roles = payload.map((role) =>
            IamRole.register(
                role.id,
                undefined, // rowId
                role.name,
                role.defaultRedirection,
                role.hasHiddenVerticalNavigation,
                role.isMaster,
                role.permissionIds,
                role.accountIds,
                new IamRoleCreatedAt({ currentTimestamp: true }),
                new IamRoleUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(roles, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesRegistered = this.publisher.mergeObjectContext(
            new IamAddRolesContextEvent(roles, cQMetadata),
        );

        rolesRegistered.created(); // apply event to model events
        rolesRegistered.commit(); // commit all events of model
    }
}
