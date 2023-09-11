import { IamAddRolesContextEvent, IamIRoleRepository, IamRole } from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDeletedAt,
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
export class IamCreateRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        payload: {
            id: IamRoleId;
            name: IamRoleName;
            isMaster: IamRoleIsMaster;
            permissionIds: IamRolePermissionIds;
            accountIds: IamRoleAccountIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateRoles = payload.map(role => IamRole.register(
            role.id,
            role.name,
            role.isMaster,
            role.permissionIds,
            role.accountIds,
            new IamRoleCreatedAt({ currentTimestamp: true }),
            new IamRoleUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateRoles,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesRegistered = this.publisher.mergeObjectContext(new IamAddRolesContextEvent(aggregateRoles));

        rolesRegistered.created(); // apply event to model events
        rolesRegistered.commit(); // commit all events of model
    }
}
