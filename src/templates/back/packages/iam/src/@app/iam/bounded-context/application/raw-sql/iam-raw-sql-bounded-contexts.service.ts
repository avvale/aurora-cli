import { IamBoundedContext, IamIBoundedContextRepository } from '@app/iam/bounded-context';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamRawSQLBoundedContextsService
{
    constructor(
        private readonly repository: IamIBoundedContextRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<IamBoundedContext[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
