import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamUser } from '../../domain/iam-user.aggregate';

@Injectable()
export class IamRawSQLUsersService
{
    constructor(
        private readonly repository: IamIUserRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamUser[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
