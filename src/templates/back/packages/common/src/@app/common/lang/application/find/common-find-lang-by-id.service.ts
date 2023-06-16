import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonLang } from '../../domain/common-lang.aggregate';
import { CommonLangId } from '../../domain/value-objects';

@Injectable()
export class CommonFindLangByIdService
{
    constructor(
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        id: CommonLangId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonLang>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}