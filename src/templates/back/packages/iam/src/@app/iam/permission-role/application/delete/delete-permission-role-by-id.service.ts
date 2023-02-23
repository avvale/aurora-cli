import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';

@Injectable()
export class DeletePermissionRoleByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(
        permissionId: PermissionRolePermissionId,
        roleId: PermissionRoleRoleId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const permissionRole = await this.repository.find(
            {
                queryStatement: {
                    where: {
                        permissionId: permissionId.value,
                        roleId      : roleId.value,
                    },
                },
                constraint,
                cQMetadata,
            },
        );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.delete(
            {
                queryStatement: {
                    where: {
                        permissionId: permissionId.value,
                        roleId      : roleId.value,
                    },
                },
                cQMetadata,
                deleteOptions: cQMetadata?.repositoryOptions,
            },
        );

        // insert EventBus in object, to be able to apply and commit events
        const permissionRoleRegister = this.publisher.mergeObjectContext(permissionRole);

        permissionRoleRegister.deleted(permissionRole); // apply event to model events
        permissionRoleRegister.commit(); // commit all events of model
    }
}