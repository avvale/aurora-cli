import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { ITenantRepository } from '../../domain/tenant.repository';
import { IamTenant } from '../../domain/tenant.aggregate';

@Injectable()
export class RawSQLTenantsService
{
    constructor(
        private readonly repository: ITenantRepository,
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