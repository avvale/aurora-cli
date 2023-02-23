import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IAccountRepository } from '../../domain/account.repository';
import { IamAccount } from '../../domain/account.aggregate';

@Injectable()
export class RawSQLAccountsService
{
    constructor(
        private readonly repository: IAccountRepository,
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