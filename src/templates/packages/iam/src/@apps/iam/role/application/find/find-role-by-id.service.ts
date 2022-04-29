import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IRoleRepository } from '../../domain/role.repository';
import { IamRole } from '../../domain/role.aggregate';
import { RoleId } from '../../domain/value-objects';

@Injectable()
export class FindRoleByIdService
{
    constructor(
        private readonly repository: IRoleRepository,
    ) {}

    async main(id: RoleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamRole>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}