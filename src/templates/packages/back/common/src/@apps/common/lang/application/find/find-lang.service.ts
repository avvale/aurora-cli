import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { ILangRepository } from './../../domain/lang.repository';
import { CommonLang } from './../../domain/lang.aggregate';

@Injectable()
export class FindLangService
{
    constructor(
        private readonly repository: ILangRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonLang>
    {
        return await this.repository.find({ queryStatement, constraint, cQMetadata });
    }
}