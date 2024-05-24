import { IamAddPermissionsContextEvent, IamIPermissionRepository, IamPermission } from '@app/iam/permission';
import {
    IamPermissionBoundedContextId,
    IamPermissionCreatedAt,
    IamPermissionDeletedAt,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionUpdatedAt,
} from '@app/iam/permission/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateAndIncrementPermissionsService
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

        // update and increment
        await this.repository.updateAndIncrement(
            permission,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
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
            new IamAddPermissionsContextEvent(
                permissions,
                cQMetadata,
            ),
        );

        permissionsRegister.updatedAndIncremented(); // apply event to model events
        permissionsRegister.commit(); // commit all events of model
    }
}
