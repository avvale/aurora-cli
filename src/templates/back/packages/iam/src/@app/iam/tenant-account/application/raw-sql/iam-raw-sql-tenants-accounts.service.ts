import { IamITenantAccountRepository, IamTenantAccount } from '@app/iam/tenant-account';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRawSQLTenantsAccountsService
{
    constructor(
        private readonly repository: IamITenantAccountRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenantAccount[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
