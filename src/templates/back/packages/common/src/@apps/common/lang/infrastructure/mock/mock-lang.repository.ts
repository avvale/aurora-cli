import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { ILangRepository } from '@app/common/lang/domain/lang.repository';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangCustomCode,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from '@app/common/lang/domain/value-objects';
import { CommonLang } from '../../domain/lang.aggregate';
import { langs } from '../seeds/lang.seed';

@Injectable()
export class MockLangRepository extends MockRepository<CommonLang> implements ILangRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonLang';
    public collectionSource: CommonLang[];
    public deletedAtInstance: LangDeletedAt = new LangDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>langs)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonLang.register(
                new LangId(itemCollection.id),
                new LangName(itemCollection.name),
                new LangImage(itemCollection.image),
                new LangIso6392(itemCollection.iso6392),
                new LangIso6393(itemCollection.iso6393),
                new LangIetf(itemCollection.ietf),
                new LangCustomCode(itemCollection.customCode),
                new LangDir(itemCollection.dir),
                new LangSort(itemCollection.sort),
                new LangIsActive(itemCollection.isActive),
                new LangCreatedAt(itemCollection.createdAt),
                new LangUpdatedAt(itemCollection.updatedAt),
                new LangDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}