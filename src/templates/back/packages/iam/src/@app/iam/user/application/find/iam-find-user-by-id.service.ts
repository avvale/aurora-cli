import { IamIUserRepository, IamUser } from '@app/iam/user';
import { IamUserId } from '@app/iam/user/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
