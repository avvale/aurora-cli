import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IRoleRepository } from '../../domain/role.repository';
import { IamRole } from '../../domain/role.aggregate';

@Injectable()
export class RawSQLRolesService
{
    constructor(
        private readonly repository: IRoleRepository,
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