import { CommonLang } from '../../domain/common-lang.aggregate';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindLangService
{
    constructor(
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonLang>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}