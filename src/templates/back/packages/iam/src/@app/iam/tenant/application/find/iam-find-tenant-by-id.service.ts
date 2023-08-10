import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamTenant } from '../../domain/iam-tenant.aggregate';
import { IamTenantId } from '../../domain/value-objects';

@Injectable()
export class IamFindTenantByIdService
{
    constructor(
        private readonly repository: IamITenantRepository,
    ) {}

    async main(
        id: IamTenantId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenant>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
