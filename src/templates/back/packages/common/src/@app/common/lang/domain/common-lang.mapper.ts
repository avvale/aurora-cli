import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { CommonLang } from './common-lang.aggregate';
import { CommonLangResponse } from './common-lang.response';
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
} from './value-objects';

export class CommonLangMapper implements IMapper
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

        return langs.map(lang => this.makeAggregate(lang, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param lang
     */
    mapAggregateToResponse(lang: CommonLang): CommonLangResponse
    {
        return this.makeResponse(lang);
    }

    /**
     * Map array of aggregates to array responses
     * @param langs
     */
    mapAggregatesToResponses(langs: CommonLang[]): CommonLangResponse[]
    {
        if (!Array.isArray(langs)) return;

        return langs.map(lang => this.makeResponse(lang));
    }

    private makeAggregate(lang: LiteralObject, cQMetadata?: CQMetadata): CommonLang
    {
        return CommonLang.register(
            new CommonLangId(lang.id, { undefinable: true }),
            new CommonLangName(lang.name, { undefinable: true }),
            new CommonLangImage(lang.image, { undefinable: true }),
            new CommonLangIso6392(lang.iso6392, { undefinable: true }),
            new CommonLangIso6393(lang.iso6393, { undefinable: true }),
            new CommonLangIetf(lang.ietf, { undefinable: true }),
            new CommonLangCustomCode(lang.customCode, { undefinable: true }),
            new CommonLangDir(lang.dir, { undefinable: true }),
            new CommonLangSort(lang.sort, { undefinable: true }),
            new CommonLangIsActive(lang.isActive, { undefinable: true }),
            new CommonLangCreatedAt(lang.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonLangUpdatedAt(lang.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonLangDeletedAt(lang.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(lang: CommonLang): CommonLangResponse
    {
        if (!lang) return;

        return new CommonLangResponse(
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
