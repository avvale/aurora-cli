import { IamIRoleRepository, IamRole } from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDefaultRedirection,
    IamRoleHasHiddenVerticalNavigation,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateRoleService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        payload: {
            id: IamRoleId;
            name: IamRoleName;
            defaultRedirection: IamRoleDefaultRedirection;
            hasHiddenVerticalNavigation: IamRoleHasHiddenVerticalNavigation;
            isMaster: IamRoleIsMaster;
            permissionIds: IamRolePermissionIds;
            accountIds: IamRoleAccountIds;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const role = IamRole.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.defaultRedirection,
            payload.hasHiddenVerticalNavigation,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            new IamRoleCreatedAt({ currentTimestamp: true }),
            new IamRoleUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(role, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(role);

        roleRegister.created({
            payload: role,
            cQMetadata,
        }); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}
