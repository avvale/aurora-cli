import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { CommonLang } from '../../domain/lang.aggregate';
import { langs } from './mock-lang.data';
import * as _ from 'lodash';

@Injectable()
export class MockLangSeeder extends MockSeeder<CommonLang>
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

        for (const lang of _.orderBy(langs, ['id']))
        {
            this.collectionSource.push(
                CommonLang.register(
                    new LangId(lang.id),
                    new LangName(lang.name),
                    new LangImage(lang.image),
                    new LangIso6392(lang.iso6392),
                    new LangIso6393(lang.iso6393),
                    new LangIetf(lang.ietf),
                    new LangCustomCode(lang.customCode),
                    new LangDir(lang.dir),
                    new LangSort(lang.sort),
                    new LangIsActive(lang.isActive),
                    new LangCreatedAt({ currentTimestamp: true }),
                    new LangUpdatedAt({ currentTimestamp: true }),
                    new LangDeletedAt(null),
                ),
            );
        }
    }
}