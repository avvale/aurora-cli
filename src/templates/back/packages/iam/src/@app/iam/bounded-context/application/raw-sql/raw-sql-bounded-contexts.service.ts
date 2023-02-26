import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { IamBoundedContext } from '../../domain/bounded-context.aggregate';

@Injectable()
export class RawSQLBoundedContextsService
{
    constructor(
        private readonly repository: IBoundedContextRepository,
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