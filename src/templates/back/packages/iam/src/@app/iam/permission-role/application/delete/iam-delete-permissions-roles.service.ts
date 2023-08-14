import { IamAddPermissionsRolesContextEvent, IamIPermissionRoleRepository } from '@app/iam/permission-role';
import { CQMetadata, Operator, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';

@Injectable()
export class IamDeletePermissionsRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        payload: {
            permissionId: IamPermissionRolePermissionId;
            roleId: IamPermissionRoleRoleId;
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
            new IamAddPermissionsRolesContextEvent(permissionsRoles),
        );

        permissionsRolesRegistered.deleted(); // apply event to model events
        permissionsRolesRegistered.commit(); // commit all events of model
    }
}