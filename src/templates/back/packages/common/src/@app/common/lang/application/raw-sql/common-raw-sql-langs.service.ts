import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonLang } from '../../domain/common-lang.aggregate';

@Injectable()
export class CommonRawSQLLangsService
{
    constructor(
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<CommonLang[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
