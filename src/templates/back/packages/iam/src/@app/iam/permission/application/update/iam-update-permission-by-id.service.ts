import { IamIPermissionRepository, IamPermission } from '@app/iam/permission';
import {
    IamPermissionBoundedContextId,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionUpdatedAt,
} from '@app/iam/permission/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdatePermissionByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        payload: {
            id: IamPermissionId;
            name?: IamPermissionName;
            boundedContextId?: IamPermissionBoundedContextId;
            roleIds?: IamPermissionRoleIds;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const permission = IamPermission.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            null, // createdAt
            new IamPermissionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(permission, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionRegister =
            this.publisher.mergeObjectContext(permission);

        permissionRegister.updated({
            payload: permission,
            cQMetadata,
        }); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}
