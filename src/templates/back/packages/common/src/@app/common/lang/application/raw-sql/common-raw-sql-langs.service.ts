import { CommonILangRepository, CommonLang } from '@app/common/lang';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
