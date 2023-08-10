import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIRoleRepository } from '../../domain/iam-role.repository';
import { IamRole } from '../../domain/iam-role.aggregate';

@Injectable()
export class IamRawSQLRolesService
{
    constructor(
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamRole[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
