import { AggregateRoot } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel1 } from '../../domain/common-administrative-area-level-1.aggregate';
import { CommonCreatedAdministrativeAreaLevel1Event } from './common-created-administrative-area-level-1.event';
import { CommonCreatedAdministrativeAreasLevel1Event } from './common-created-administrative-areas-level-1.event';
import { CommonUpdatedAdministrativeAreaLevel1Event } from './common-updated-administrative-area-level-1.event';
import { CommonUpdatedAdministrativeAreasLevel1Event } from './common-updated-administrative-areas-level-1.event';
import { CommonDeletedAdministrativeAreaLevel1Event } from './common-deleted-administrative-area-level-1.event';
import { CommonDeletedAdministrativeAreasLevel1Event } from './common-deleted-administrative-areas-level-1.event';

export class CommonAddAdministrativeAreasLevel1ContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CommonAdministrativeAreaLevel1[] = [],
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
            new CommonCreatedAdministrativeAreasLevel1Event(
                this.aggregateRoots.map(administrativeAreaLevel1 =>
                    new CommonCreatedAdministrativeAreaLevel1Event(
                        administrativeAreaLevel1.id.value,
                        administrativeAreaLevel1.countryId.value,
                        administrativeAreaLevel1.code.value,
                        administrativeAreaLevel1.customCode?.value,
                        administrativeAreaLevel1.name.value,
                        administrativeAreaLevel1.slug.value,
                        administrativeAreaLevel1.latitude?.value,
                        administrativeAreaLevel1.longitude?.value,
                        administrativeAreaLevel1.zoom?.value,
                        administrativeAreaLevel1.mapType.value,
                        administrativeAreaLevel1.createdAt?.value,
                        administrativeAreaLevel1.updatedAt?.value,
                        administrativeAreaLevel1.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new CommonUpdatedAdministrativeAreasLevel1Event(
                this.aggregateRoots.map(administrativeAreaLevel1 =>
                    new CommonUpdatedAdministrativeAreaLevel1Event(
                        administrativeAreaLevel1.id.value,
                        administrativeAreaLevel1.countryId.value,
                        administrativeAreaLevel1.code.value,
                        administrativeAreaLevel1.customCode?.value,
                        administrativeAreaLevel1.name.value,
                        administrativeAreaLevel1.slug.value,
                        administrativeAreaLevel1.latitude?.value,
                        administrativeAreaLevel1.longitude?.value,
                        administrativeAreaLevel1.zoom?.value,
                        administrativeAreaLevel1.mapType.value,
                        administrativeAreaLevel1.createdAt?.value,
                        administrativeAreaLevel1.updatedAt?.value,
                        administrativeAreaLevel1.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new CommonDeletedAdministrativeAreasLevel1Event(
                this.aggregateRoots.map(administrativeAreaLevel1 =>
                    new CommonDeletedAdministrativeAreaLevel1Event(
                        administrativeAreaLevel1.id.value,
                        administrativeAreaLevel1.countryId.value,
                        administrativeAreaLevel1.code.value,
                        administrativeAreaLevel1.customCode?.value,
                        administrativeAreaLevel1.name.value,
                        administrativeAreaLevel1.slug.value,
                        administrativeAreaLevel1.latitude?.value,
                        administrativeAreaLevel1.longitude?.value,
                        administrativeAreaLevel1.zoom?.value,
                        administrativeAreaLevel1.mapType.value,
                        administrativeAreaLevel1.createdAt?.value,
                        administrativeAreaLevel1.updatedAt?.value,
                        administrativeAreaLevel1.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}