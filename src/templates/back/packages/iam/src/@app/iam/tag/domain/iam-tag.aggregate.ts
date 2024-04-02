/* eslint-disable key-spacing */
import { IamCreatedTagEvent, IamDeletedTagEvent, IamUpdatedTagEvent } from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamTag extends AggregateRoot
{
    id: IamTagId;
    name: IamTagName;
    createdAt: IamTagCreatedAt;
    updatedAt: IamTagUpdatedAt;
    deletedAt: IamTagDeletedAt;

    constructor(
        id: IamTagId,
        name: IamTagName,
        createdAt: IamTagCreatedAt,
        updatedAt: IamTagUpdatedAt,
        deletedAt: IamTagDeletedAt,
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: IamTagId,
        name: IamTagName,
        createdAt: IamTagCreatedAt,
        updatedAt: IamTagUpdatedAt,
        deletedAt: IamTagDeletedAt,
    ): IamTag
    {
        return new IamTag(
            id,
            name,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(tag: IamTag): void
    {
        this.apply(
            new IamCreatedTagEvent(
                tag.id.value,
                tag.name.value,
                tag.createdAt?.value,
                tag.updatedAt?.value,
                tag.deletedAt?.value,
            ),
        );
    }

    updated(tag: IamTag): void
    {
        this.apply(
            new IamUpdatedTagEvent(
                tag.id?.value,
                tag.name?.value,
                tag.createdAt?.value,
                tag.updatedAt?.value,
                tag.deletedAt?.value,
            ),
        );
    }

    deleted(tag: IamTag): void
    {
        this.apply(
            new IamDeletedTagEvent(
                tag.id.value,
                tag.name.value,
                tag.createdAt?.value,
                tag.updatedAt?.value,
                tag.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
