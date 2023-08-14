import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    CommonLangId,
    CommonLangName,
    CommonLangImage,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangIetf,
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangSort,
    CommonLangIsActive,
    CommonLangCreatedAt,
    CommonLangUpdatedAt,
    CommonLangDeletedAt,
} from '../../domain/value-objects';
import { CommonLang } from '../../domain/common-lang.aggregate';
import { commonMockLangData } from './common-mock-lang.data';
import * as _ from 'lodash';

@Injectable()
export class CommonMockLangSeeder extends MockSeeder<CommonLang>
{
    public collectionSource: CommonLang[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const lang of _.orderBy(commonMockLangData, ['id']))
        {
            this.collectionSource.push(
                CommonLang.register(
                    new CommonLangId(lang.id),
                    new CommonLangName(lang.name),
                    new CommonLangImage(lang.image),
                    new CommonLangIso6392(lang.iso6392),
                    new CommonLangIso6393(lang.iso6393),
                    new CommonLangIetf(lang.ietf),
                    new CommonLangCustomCode(lang.customCode),
                    new CommonLangDir(lang.dir),
                    new CommonLangSort(lang.sort),
                    new CommonLangIsActive(lang.isActive),
                    new CommonLangCreatedAt({ currentTimestamp: true }),
                    new CommonLangUpdatedAt({ currentTimestamp: true }),
                    new CommonLangDeletedAt(null),
                ),
            );
        }
    }
}
