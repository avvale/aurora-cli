import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { CommonLang } from './lang.aggregate';
import { LangResponse } from './lang.response';
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
} from './value-objects';

export class LangMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param lang
     */
    mapModelToAggregate(lang: LiteralObject, cQMetadata?: CQMetadata): CommonLang
    {
        if (!lang) return;

        return this.makeAggregate(lang, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param langs
     */
    mapModelsToAggregates(langs: LiteralObject[], cQMetadata?: CQMetadata): CommonLang[]
    {
        if (!Array.isArray(langs)) return;

        return langs.map(lang  => this.makeAggregate(lang, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param lang
     */
    mapAggregateToResponse(lang: CommonLang): LangResponse
    {
        return this.makeResponse(lang);
    }

    /**
     * Map array of aggregates to array responses
     * @param langs
     */
    mapAggregatesToResponses(langs: CommonLang[]): LangResponse[]
    {
        if (!Array.isArray(langs)) return;

        return langs.map(lang => this.makeResponse(lang));
    }

    private makeAggregate(lang: LiteralObject, cQMetadata?: CQMetadata): CommonLang
    {
        return CommonLang.register(
            new LangId(lang.id, { undefinable: true }),
            new LangName(lang.name, { undefinable: true }),
            new LangImage(lang.image, { undefinable: true }),
            new LangIso6392(lang.iso6392, { undefinable: true }),
            new LangIso6393(lang.iso6393, { undefinable: true }),
            new LangIetf(lang.ietf, { undefinable: true }),
            new LangCustomCode(lang.customCode, { undefinable: true }),
            new LangDir(lang.dir, { undefinable: true }),
            new LangSort(lang.sort, { undefinable: true }),
            new LangIsActive(lang.isActive, { undefinable: true }),
            new LangCreatedAt(lang.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new LangUpdatedAt(lang.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new LangDeletedAt(lang.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(lang: CommonLang): LangResponse
    {
        if (!lang) return;

        return new LangResponse(
            lang.id.value,
            lang.name.value,
            lang.image.value,
            lang.iso6392.value,
            lang.iso6393.value,
            lang.ietf.value,
            lang.customCode.value,
            lang.dir.value,
            lang.sort.value,
            lang.isActive.value,
            lang.createdAt.value,
            lang.updatedAt.value,
            lang.deletedAt.value,
        );
    }
}