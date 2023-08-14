import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamAccount } from '../../domain/iam-account.aggregate';
import { IamAccountId } from '../../domain/value-objects';

@Injectable()
export class IamFindAccountByIdService
{
    constructor(
        private readonly repository: IamIAccountRepository,
    ) {}

    async main(
        id: IamAccountId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamAccount>
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
