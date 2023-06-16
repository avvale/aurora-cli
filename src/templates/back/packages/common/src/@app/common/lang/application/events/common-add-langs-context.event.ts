import { AggregateRoot } from '@nestjs/cqrs';
import { CommonLang } from '../../domain/common-lang.aggregate';
import { CommonCreatedLangEvent } from './common-created-lang.event';
import { CommonCreatedLangsEvent } from './common-created-langs.event';
import { CommonUpdatedLangEvent } from './common-updated-lang.event';
import { CommonUpdatedLangsEvent } from './common-updated-langs.event';
import { CommonDeletedLangEvent } from './common-deleted-lang.event';
import { CommonDeletedLangsEvent } from './common-deleted-langs.event';

export class CommonAddLangsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CommonLang[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new CommonCreatedLangsEvent(
                this.aggregateRoots.map(lang =>
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
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new CommonUpdatedLangsEvent(
                this.aggregateRoots.map(lang =>
                    new CommonUpdatedLangEvent(
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
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new CommonDeletedLangsEvent(
                this.aggregateRoots.map(lang =>
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
                ),
            ),
        );
    }
}