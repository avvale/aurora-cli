import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from '../../domain/value-objects';
import { IRoleRepository } from '../../domain/role.repository';
import { IamRole } from '../../domain/role.aggregate';
import { AddRolesContextEvent } from '../events/add-roles-context.event';

@Injectable()
export class CreateRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRoleRepository,
    ) {}

    async main(
        roles: {
            id: RoleId;
            name: RoleName;
            isMaster: RoleIsMaster;
            permissionIds: RolePermissionIds;
            accountIds: RoleAccountIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateRoles = roles.map(role => IamRole.register(
            role.id,
            role.name,
            role.isMaster,
            role.permissionIds,
            role.accountIds,
            new RoleCreatedAt({ currentTimestamp: true }),
            new RoleUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateRoles, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesRegistered = this.publisher.mergeObjectContext(new AddRolesContextEvent(aggregateRoles));

        rolesRegistered.created(); // apply event to model events
        rolesRegistered.commit(); // commit all events of model
    }
}