import { IamIRoleAccountRepository, IamRoleAccount } from '@app/iam/role-account';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRawSQLRolesAccountsService
{
    constructor(
        private readonly repository: IamIRoleAccountRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamRoleAccount[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
