/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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
import { CommonCreatedLangEvent } from '../application/events/common-created-lang.event';
import { CommonUpdatedLangEvent } from '../application/events/common-updated-lang.event';
import { CommonDeletedLangEvent } from '../application/events/common-deleted-lang.event';

export class CommonLang extends AggregateRoot
{
    id: CommonLangId;
    name: CommonLangName;
    image: CommonLangImage;
    iso6392: CommonLangIso6392;
    iso6393: CommonLangIso6393;
    ietf: CommonLangIetf;
    customCode: CommonLangCustomCode;
    dir: CommonLangDir;
    sort: CommonLangSort;
    isActive: CommonLangIsActive;
    createdAt: CommonLangCreatedAt;
    updatedAt: CommonLangUpdatedAt;
    deletedAt: CommonLangDeletedAt;

    // eager relationship

    constructor(
        id: CommonLangId,
        name: CommonLangName,
        image: CommonLangImage,
        iso6392: CommonLangIso6392,
        iso6393: CommonLangIso6393,
        ietf: CommonLangIetf,
        customCode: CommonLangCustomCode,
        dir: CommonLangDir,
        sort: CommonLangSort,
        isActive: CommonLangIsActive,
        createdAt: CommonLangCreatedAt,
        updatedAt: CommonLangUpdatedAt,
        deletedAt: CommonLangDeletedAt,

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
        id: CommonLangId,
        name: CommonLangName,
        image: CommonLangImage,
        iso6392: CommonLangIso6392,
        iso6393: CommonLangIso6393,
        ietf: CommonLangIetf,
        customCode: CommonLangCustomCode,
        dir: CommonLangDir,
        sort: CommonLangSort,
        isActive: CommonLangIsActive,
        createdAt: CommonLangCreatedAt,
        updatedAt: CommonLangUpdatedAt,
        deletedAt: CommonLangDeletedAt,

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
            new CommonCreatedLangEvent(
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
            new CommonUpdatedLangEvent(
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
            new CommonDeletedLangEvent(
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

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
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
}
