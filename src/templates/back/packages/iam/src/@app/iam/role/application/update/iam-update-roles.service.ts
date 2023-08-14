import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    IamRoleId,
    IamRoleName,
    IamRoleIsMaster,
    IamRolePermissionIds,
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleUpdatedAt,
    IamRoleDeletedAt,
} from '../../domain/value-objects';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamRole } from '../../domain/iam-role.aggregate';
import { IamAddRolesContextEvent } from '../events/iam-add-roles-context.event';

@Injectable()
export class IamUpdateRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        payload: {
            id?: IamRoleId;
            name?: IamRoleName;
            isMaster?: IamRoleIsMaster;
            permissionIds?: IamRolePermissionIds;
            accountIds?: IamRoleAccountIds;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const role = IamRole.register(
            payload.id,
            payload.name,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            null, // createdAt
            new IamRoleUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            role,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const roles = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const rolesRegister = this.publisher.mergeObjectContext(
            new IamAddRolesContextEvent(roles),
        );

        rolesRegister.updated(); // apply event to model events
        rolesRegister.commit(); // commit all events of model
    }
}
