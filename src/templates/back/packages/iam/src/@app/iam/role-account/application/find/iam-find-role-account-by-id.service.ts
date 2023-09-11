import { IamIRoleAccountRepository, IamRoleAccount } from '@app/iam/role-account';
import { IamRoleAccountAccountId, IamRoleAccountRoleId } from '@app/iam/role-account/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindRoleAccountByIdService
{
    constructor(
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        roleId: IamRoleAccountRoleId,
        accountId: IamRoleAccountAccountId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamRoleAccount>
    {
        return await this.repository.findById(
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
    }
}
