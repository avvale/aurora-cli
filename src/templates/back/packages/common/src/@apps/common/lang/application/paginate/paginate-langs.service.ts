import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { ILangRepository } from '../../domain/lang.repository';
import { CommonLang } from '../../domain/lang.aggregate';

@Injectable()
export class PaginateLangsService
{
    constructor(
        private readonly repository: ILangRepository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonLang>>
    {
        return await this.repository.paginate({ queryStatement, constraint, cQMetadata });
    }
}