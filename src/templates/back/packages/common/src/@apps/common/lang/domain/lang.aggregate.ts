/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurorajs.dev/core';
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
import { CreatedLangEvent } from '../application/events/created-lang.event';
import { UpdatedLangEvent } from '../application/events/updated-lang.event';
import { DeletedLangEvent } from '../application/events/deleted-lang.event';

export class CommonLang extends AggregateRoot
{
    id: LangId;
    name: LangName;
    image: LangImage;
    iso6392: LangIso6392;
    iso6393: LangIso6393;
    ietf: LangIetf;
    customCode: LangCustomCode;
    dir: LangDir;
    sort: LangSort;
    isActive: LangIsActive;
    createdAt: LangCreatedAt;
    updatedAt: LangUpdatedAt;
    deletedAt: LangDeletedAt;

    // eager relationship

    constructor(
        id: LangId,
        name: LangName,
        image: LangImage,
        iso6392: LangIso6392,
        iso6393: LangIso6393,
        ietf: LangIetf,
        customCode: LangCustomCode,
        dir: LangDir,
        sort: LangSort,
        isActive: LangIsActive,
        createdAt: LangCreatedAt,
        updatedAt: LangUpdatedAt,
        deletedAt: LangDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.image = image;
        this.iso6392 = iso6392;
        this.iso6393 = iso6393;
        this.ietf = ietf;
        this.customCode = customCode;
        this.dir = dir;
        this.sort = sort;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: LangId,
        name: LangName,
        image: LangImage,
        iso6392: LangIso6392,
        iso6393: LangIso6393,
        ietf: LangIetf,
        customCode: LangCustomCode,
        dir: LangDir,
        sort: LangSort,
        isActive: LangIsActive,
        createdAt: LangCreatedAt,
        updatedAt: LangUpdatedAt,
        deletedAt: LangDeletedAt,

    ): CommonLang
    {
        return new CommonLang(
            id,
            name,
            image,
            iso6392,
            iso6393,
            ietf,
            customCode,
            dir,
            sort,
            isActive,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(lang: CommonLang): void
    {
        this.apply(
            new CreatedLangEvent(
                lang.id.value,
                lang.name.value,
                lang.image?.value,
                lang.iso6392.value,
                lang.iso6393.value,
                lang.ietf.value,
                lang.customCode?.value,
                lang.dir.value,
                lang.sort?.value,
                lang.isActive.value,
                lang.createdAt?.value,
                lang.updatedAt?.value,
                lang.deletedAt?.value,
            ),
        );
    }

    updated(lang: CommonLang): void
    {
        this.apply(
            new UpdatedLangEvent(
                lang.id?.value,
                lang.name?.value,
                lang.image?.value,
                lang.iso6392?.value,
                lang.iso6393?.value,
                lang.ietf?.value,
                lang.customCode?.value,
                lang.dir?.value,
                lang.sort?.value,
                lang.isActive?.value,
                lang.createdAt?.value,
                lang.updatedAt?.value,
                lang.deletedAt?.value,
            ),
        );
    }

    deleted(lang: CommonLang): void
    {
        this.apply(
            new DeletedLangEvent(
                lang.id.value,
                lang.name.value,
                lang.image?.value,
                lang.iso6392.value,
                lang.iso6393.value,
                lang.ietf.value,
                lang.customCode?.value,
                lang.dir.value,
                lang.sort?.value,
                lang.isActive.value,
                lang.createdAt?.value,
                lang.updatedAt?.value,
                lang.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            image: this.image?.value,
            iso6392: this.iso6392.value,
            iso6393: this.iso6393.value,
            ietf: this.ietf.value,
            customCode: this.customCode?.value,
            dir: this.dir.value,
            sort: this.sort?.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
