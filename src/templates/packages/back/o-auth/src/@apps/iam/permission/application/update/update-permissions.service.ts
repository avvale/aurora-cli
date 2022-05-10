import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
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
export class UpdatePermissionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository,
    ) {}

    async main(
        payload: {
            id?: PermissionId;
            name?: PermissionName;
            boundedContextId?: PermissionBoundedContextId;
            roleIds?: PermissionRoleIds;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const permission = IamPermission.register(
            payload.id,
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            null, // createdAt
            new PermissionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(permission, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const permissions = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionsRegister = this.publisher.mergeObjectContext(
            new AddPermissionsContextEvent(permissions),
        );

        permissionsRegister.updated(); // apply event to model events
        permissionsRegister.commit(); // commit all events of model
    }
}