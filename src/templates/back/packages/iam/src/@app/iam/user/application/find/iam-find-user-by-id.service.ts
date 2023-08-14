import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IamIUserRepository } from '../../domain/iam-user.repository';
import { IamUser } from '../../domain/iam-user.aggregate';
import { IamUserId } from '../../domain/value-objects';

@Injectable()
export class IamFindUserByIdService
{
    constructor(
        private readonly repository: IamIUserRepository,
    ) {}

    async main(
        id: IamUserId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamUser>
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
