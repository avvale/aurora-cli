import { IamIAccountRepository } from '@app/iam/account';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCountAccountService {
    constructor(private readonly repository: IamIAccountRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number> {
        return await this.repository.count({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
