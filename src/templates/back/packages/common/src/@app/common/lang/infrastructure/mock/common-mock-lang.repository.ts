import { CommonILangRepository, CommonLang, commonMockLangData } from '@app/common/lang';
import {
    CommonLangCreatedAt,
    CommonLangCustomCode,
    CommonLangDeletedAt,
    CommonLangDir,
    CommonLangId,
    CommonLangIetf,
    CommonLangImage,
    CommonLangIsActive,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangName,
    CommonLangSort,
    CommonLangUpdatedAt,
} from '@app/common/lang/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockLangRepository extends MockRepository<CommonLang> implements CommonILangRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonLang';
    public collectionSource: CommonLang[];

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

        for (const itemCollection of <any[]>commonMockLangData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonLang.register(
                new CommonLangId(itemCollection.id),
                new CommonLangName(itemCollection.name),
                new CommonLangImage(itemCollection.image),
                new CommonLangIso6392(itemCollection.iso6392),
                new CommonLangIso6393(itemCollection.iso6393),
                new CommonLangIetf(itemCollection.ietf),
                new CommonLangCustomCode(itemCollection.customCode),
                new CommonLangDir(itemCollection.dir),
                new CommonLangSort(itemCollection.sort),
                new CommonLangIsActive(itemCollection.isActive),
                new CommonLangCreatedAt(itemCollection.createdAt),
                new CommonLangUpdatedAt(itemCollection.updatedAt),
                new CommonLangDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
