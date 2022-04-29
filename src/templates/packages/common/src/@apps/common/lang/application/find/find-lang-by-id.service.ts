import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { ILangRepository } from './../../domain/lang.repository';
import { CommonLang } from './../../domain/lang.aggregate';
import { LangId } from './../../domain/value-objects';

@Injectable()
export class FindLangByIdService
{
    constructor(
        private readonly repository: ILangRepository,
    ) {}

    public async main(id: LangId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonLang>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}