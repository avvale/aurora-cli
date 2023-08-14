import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamBoundedContext } from '../../domain/iam-bounded-context.aggregate';

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
