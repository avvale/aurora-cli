import { IamIRoleAccountRepository, IamRoleAccount } from '@app/iam/role-account';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpsertRoleAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        payload: {
            roleId: IamRoleAccountRoleId;
            accountId: IamRoleAccountAccountId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const roleAccount = IamRoleAccount.register(
            payload.roleId,
            payload.accountId,
        );

        await this.repository
            .upsert(
                roleAccount,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const roleAccountRegister = this.publisher.mergeObjectContext(
            roleAccount,
        );

        roleAccountRegister.created(roleAccount); // apply event to model events
        roleAccountRegister.commit(); // commit all events of model
    }
}
