import { IamITenantRepository, IamTenant } from '@app/iam/tenant';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRawSQLTenantsService {
    constructor(private readonly repository: IamITenantRepository) {}

    async main(rawSQL?: string, cQMetadata?: CQMetadata): Promise<IamTenant[]> {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
