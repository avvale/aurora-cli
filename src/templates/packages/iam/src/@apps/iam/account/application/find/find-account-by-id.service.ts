import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAccountRepository } from '../../domain/account.repository';
import { IamAccount } from '../../domain/account.aggregate';
import { AccountId } from '../../domain/value-objects';

@Injectable()
export class FindAccountByIdService
{
    constructor(
        private readonly repository: IAccountRepository,
    ) {}

    async main(id: AccountId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamAccount>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}