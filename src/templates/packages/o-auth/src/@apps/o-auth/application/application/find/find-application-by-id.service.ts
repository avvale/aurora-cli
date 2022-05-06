import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from 'aurora-ts-core';
import { IApplicationRepository } from '../../domain/application.repository';
import { OAuthApplication } from '../../domain/application.aggregate';
import { ApplicationId } from '../../domain/value-objects';

@Injectable()
export class FindApplicationByIdService
{
    constructor(
        private readonly repository: IApplicationRepository,
    ) {}

    async main(id: ApplicationId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthApplication>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}