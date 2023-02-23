import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement, Operator } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { AddPermissionsRolesContextEvent } from '../events/add-permissions-roles-context.event';

@Injectable()
export class DeletePermissionsRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(
        payload: {
            permissionId: PermissionRolePermissionId;
            roleId: PermissionRoleRoleId;
        } [],
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const permissionsRoles = await this.repository.get({
            queryStatement: {
                where: {
                    [Operator.or]: payload.map(permissionRole => ({
                        permissionId: permissionRole.permissionId.value,
                        roleId      : permissionRole.roleId.value,
                    })),
                },
            },
            constraint,
            cQMetadata,
        });

        await this.repository.delete({
            queryStatement: {
                where: {
                    [Operator.or]: payload.map(permissionRole => ({
                        permissionId: permissionRole.permissionId.value,
                        roleId      : permissionRole.roleId.value,
                    })),
                },
            },
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddPermissionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRolesRegistered = this.publisher.mergeObjectContext(
            new AddPermissionsRolesContextEvent(permissionsRoles),
        );

        permissionsRolesRegistered.deleted(); // apply event to model events
        permissionsRolesRegistered.commit(); // commit all events of model
    }
}