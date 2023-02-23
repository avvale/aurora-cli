import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';

@Injectable()
export class CreatePermissionRoleService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(
        payload: {
            permissionId: PermissionRolePermissionId;
            roleId: PermissionRoleRoleId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const permissionRole = IamPermissionRole.register(
            payload.permissionId,
            payload.roleId,
        );

        await this.repository.create(
            permissionRole,
            {
                createOptions       : cQMetadata?.repositoryOptions,
                finderQueryStatement: (aggregate: IamPermissionRole) => ({
                    where: {
                        permissionId: aggregate['permissionId']['value'],
                        roleId      : aggregate['roleId']['value'],
                    },
                }),
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionRoleRegister = this.publisher.mergeObjectContext(
            permissionRole,
        );

        permissionRoleRegister.created(permissionRole); // apply event to model events
        permissionRoleRegister.commit(); // commit all events of model
    }
}