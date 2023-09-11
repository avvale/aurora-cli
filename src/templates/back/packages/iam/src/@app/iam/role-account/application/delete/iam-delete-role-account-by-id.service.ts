import { IamIRoleAccountRepository } from '@app/iam/role-account';
import { IamRoleAccountAccountId, IamRoleAccountRoleId } from '@app/iam/role-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteRoleAccountByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        roleId: IamRoleAccountRoleId,
        accountId: IamRoleAccountAccountId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const roleAccount = await this.repository
            .findById(
                undefined,
                {
                    constraint,
                    cQMetadata,
                    findArguments: {
                        roleId: roleId.value,
                        accountId: accountId.value,
                    },
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                undefined,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                    findArguments: {
                        roleId: roleAccount.roleId.value,
                        accountId: roleAccount.accountId.value,
                    },
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const roleAccountRegister = this.publisher.mergeObjectContext(roleAccount);

        roleAccountRegister.deleted(roleAccount); // apply event to model events
        roleAccountRegister.commit(); // commit all events of model
    }
}
