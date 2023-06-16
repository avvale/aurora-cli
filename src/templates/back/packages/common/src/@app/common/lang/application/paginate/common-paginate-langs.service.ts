import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonLang } from '../../domain/common-lang.aggregate';

@Injectable()
export class CommonPaginateLangsService
{
    constructor(
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<CommonLang>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}