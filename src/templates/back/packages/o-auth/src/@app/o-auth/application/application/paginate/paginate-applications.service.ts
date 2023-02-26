import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurora-ts/core';
import { Pagination } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IApplicationRepository } from '../../domain/application.repository';
import { OAuthApplication } from '../../domain/application.aggregate';

@Injectable()
export class PaginateApplicationsService
{
    constructor(
        private readonly repository: IApplicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthApplication>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}