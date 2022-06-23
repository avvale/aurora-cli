import { AggregateRoot } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel3 } from '../../domain/administrative-area-level-3.aggregate';
import { CreatedAdministrativeAreaLevel3Event } from './created-administrative-area-level-3.event';
import { CreatedAdministrativeAreasLevel3Event } from './created-administrative-areas-level-3.event';
import { UpdatedAdministrativeAreaLevel3Event } from './updated-administrative-area-level-3.event';
import { UpdatedAdministrativeAreasLevel3Event } from './updated-administrative-areas-level-3.event';
import { DeletedAdministrativeAreaLevel3Event } from './deleted-administrative-area-level-3.event';
import { DeletedAdministrativeAreasLevel3Event } from './deleted-administrative-areas-level-3.event';

export class AddAdministrativeAreasLevel3ContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CommonAdministrativeAreaLevel3[] = [],
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
            new CreatedAdministrativeAreasLevel3Event(
                this.aggregateRoots.map(administrativeAreaLevel3 =>
                    new CreatedAdministrativeAreaLevel3Event(
                        administrativeAreaLevel3.id.value,
                        administrativeAreaLevel3.countryId.value,
                        administrativeAreaLevel3.administrativeAreaLevel1Id.value,
                        administrativeAreaLevel3.administrativeAreaLevel2Id.value,
                        administrativeAreaLevel3.code.value,
                        administrativeAreaLevel3.customCode?.value,
                        administrativeAreaLevel3.name.value,
                        administrativeAreaLevel3.slug.value,
                        administrativeAreaLevel3.latitude?.value,
                        administrativeAreaLevel3.longitude?.value,
                        administrativeAreaLevel3.zoom?.value,
                        administrativeAreaLevel3.createdAt?.value,
                        administrativeAreaLevel3.updatedAt?.value,
                        administrativeAreaLevel3.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new UpdatedAdministrativeAreasLevel3Event(
                this.aggregateRoots.map(administrativeAreaLevel3 =>
                    new UpdatedAdministrativeAreaLevel3Event(
                        administrativeAreaLevel3.id.value,
                        administrativeAreaLevel3.countryId.value,
                        administrativeAreaLevel3.administrativeAreaLevel1Id.value,
                        administrativeAreaLevel3.administrativeAreaLevel2Id.value,
                        administrativeAreaLevel3.code.value,
                        administrativeAreaLevel3.customCode?.value,
                        administrativeAreaLevel3.name.value,
                        administrativeAreaLevel3.slug.value,
                        administrativeAreaLevel3.latitude?.value,
                        administrativeAreaLevel3.longitude?.value,
                        administrativeAreaLevel3.zoom?.value,
                        administrativeAreaLevel3.createdAt?.value,
                        administrativeAreaLevel3.updatedAt?.value,
                        administrativeAreaLevel3.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new DeletedAdministrativeAreasLevel3Event(
                this.aggregateRoots.map(administrativeAreaLevel3 =>
                    new DeletedAdministrativeAreaLevel3Event(
                        administrativeAreaLevel3.id.value,
                        administrativeAreaLevel3.countryId.value,
                        administrativeAreaLevel3.administrativeAreaLevel1Id.value,
                        administrativeAreaLevel3.administrativeAreaLevel2Id.value,
                        administrativeAreaLevel3.code.value,
                        administrativeAreaLevel3.customCode?.value,
                        administrativeAreaLevel3.name.value,
                        administrativeAreaLevel3.slug.value,
                        administrativeAreaLevel3.latitude?.value,
                        administrativeAreaLevel3.longitude?.value,
                        administrativeAreaLevel3.zoom?.value,
                        administrativeAreaLevel3.createdAt?.value,
                        administrativeAreaLevel3.updatedAt?.value,
                        administrativeAreaLevel3.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}