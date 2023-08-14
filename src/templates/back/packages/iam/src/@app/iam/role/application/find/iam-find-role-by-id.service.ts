import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamRole } from '../../domain/iam-role.aggregate';
import { IamRoleId } from '../../domain/value-objects';

@Injectable()
export class IamFindRoleByIdService
{
    constructor(
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        id: IamRoleId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamRole>
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
