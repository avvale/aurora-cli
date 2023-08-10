import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamTenant } from '../../domain/iam-tenant.aggregate';

@Injectable()
export class IamRawSQLTenantsService
{
    constructor(
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenant[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
