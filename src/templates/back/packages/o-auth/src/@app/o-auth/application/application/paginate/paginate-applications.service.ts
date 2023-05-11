import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
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