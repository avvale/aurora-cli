import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '../../domain/value-objects';
import { IamIPermissionRepository } from '../../domain/iam-permission.repository';
import { IamPermission } from '../../domain/iam-permission.aggregate';
import { IamAddPermissionsContextEvent } from '../events/iam-add-permissions-context.event';

@Injectable()
export class IamUpdatePermissionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        payload: {
            id?: IamPermissionId;
            name?: IamPermissionName;
            boundedContextId?: IamPermissionBoundedContextId;
            roleIds?: IamPermissionRoleIds;
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
            new IamPermissionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            permission,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const permissions = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionsRegister = this.publisher.mergeObjectContext(
            new IamAddPermissionsContextEvent(permissions),
        );

        permissionsRegister.updated(); // apply event to model events
        permissionsRegister.commit(); // commit all events of model
    }
}
