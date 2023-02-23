import { AggregateRoot } from '@nestjs/cqrs';
import { CommonLang } from '../../domain/lang.aggregate';
import { CreatedLangEvent } from './created-lang.event';
import { CreatedLangsEvent } from './created-langs.event';
import { UpdatedLangEvent } from './updated-lang.event';
import { UpdatedLangsEvent } from './updated-langs.event';
import { DeletedLangEvent } from './deleted-lang.event';
import { DeletedLangsEvent } from './deleted-langs.event';

export class AddLangsContextEvent extends AggregateRoot
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
            new CreatedLangsEvent(
                this.aggregateRoots.map(lang =>
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
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new UpdatedLangsEvent(
                this.aggregateRoots.map(lang =>
                    new UpdatedLangEvent(
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
            new DeletedLangsEvent(
                this.aggregateRoots.map(lang =>
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
                ),
            ),
        );
    }
}