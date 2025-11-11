import {
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
export class IamCreatePermissionRoleService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        payload: {
            permissionId: IamPermissionRolePermissionId;
            roleId: IamPermissionRoleRoleId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const permissionRole = IamPermissionRole.register(
            payload.permissionId,
            payload.roleId,
        );

        await this.repository.create(permissionRole, {
            createOptions: cQMetadata?.repositoryOptions,
            finderQueryStatement: (aggregate: IamPermissionRole) => ({
                where: {
                    permissionId: aggregate['permissionId']['value'],
                    roleId: aggregate['roleId']['value'],
                },
            }),
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionRoleRegister =
            this.publisher.mergeObjectContext(permissionRole);

        permissionRoleRegister.created({
            payload: permissionRole,
            cQMetadata,
        }); // apply event to model events
        permissionRoleRegister.commit(); // commit all events of model
    }
}
