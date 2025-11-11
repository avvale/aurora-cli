import { IamITenantRepository, IamTenant } from '@app/iam/tenant';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTenantService {
    constructor(private readonly repository: IamITenantRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamTenant> {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
