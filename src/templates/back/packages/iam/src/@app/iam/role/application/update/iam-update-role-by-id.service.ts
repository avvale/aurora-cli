import { IamIRoleRepository, IamRole } from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdateRoleByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        payload: {
            id: IamRoleId;
            name?: IamRoleName;
            isMaster?: IamRoleIsMaster;
            permissionIds?: IamRolePermissionIds;
            accountIds?: IamRoleAccountIds;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const role = IamRole.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            null, // createdAt
            new IamRoleUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(role, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(role);

        roleRegister.updated({
            payload: role,
            cQMetadata,
        }); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}
