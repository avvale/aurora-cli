import { IamITenantRepository, IamTenant } from '@app/iam/tenant';
import { IamTenantId } from '@app/iam/tenant/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTenantByIdService {
    constructor(private readonly repository: IamITenantRepository) {}

    async main(
        id: IamTenantId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenant> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
