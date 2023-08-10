import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamAccount } from '../../domain/iam-account.aggregate';

@Injectable()
export class IamRawSQLAccountsService
{
    constructor(
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamAccount[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
