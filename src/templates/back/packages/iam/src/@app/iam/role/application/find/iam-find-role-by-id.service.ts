import { IamIRoleRepository, IamRole } from '@app/iam/role';
import { IamRoleId } from '@app/iam/role/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
