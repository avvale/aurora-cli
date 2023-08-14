import { IamIPermissionRoleRepository } from '@app/iam/permission-role';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';

@Injectable()
export class IamDeletePermissionRoleByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        permissionId: IamPermissionRolePermissionId,
        roleId: IamPermissionRoleRoleId,
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