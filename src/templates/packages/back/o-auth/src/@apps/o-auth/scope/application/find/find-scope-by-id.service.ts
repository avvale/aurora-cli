import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from 'aurora-ts-core';
import { IScopeRepository } from '../../domain/scope.repository';
import { OAuthScope } from '../../domain/scope.aggregate';
import { ScopeId } from '../../domain/value-objects';

@Injectable()
export class FindScopeByIdService
{
    constructor(
        private readonly repository: IScopeRepository,
    ) {}

    async main(id: ScopeId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthScope>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}