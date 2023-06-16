import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonLang } from '../../domain/common-lang.aggregate';

@Injectable()
export class CommonGetLangsService
{
    constructor(
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonLang[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}