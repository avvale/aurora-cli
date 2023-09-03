import { CommonAdministrativeAreaLevel3, CommonCreatedAdministrativeAreaLevel3Event, CommonCreatedAdministrativeAreasLevel3Event, CommonDeletedAdministrativeAreaLevel3Event, CommonDeletedAdministrativeAreasLevel3Event, CommonUpdatedAdministrativeAreaLevel3Event, CommonUpdatedAdministrativeAreasLevel3Event } from '@app/common/administrative-area-level-3';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAdministrativeAreasLevel3ContextEvent extends AggregateRoot
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
            new CommonCreatedAdministrativeAreasLevel3Event(
                this.aggregateRoots.map(administrativeAreaLevel3 =>
                    new CommonCreatedAdministrativeAreaLevel3Event(
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
                        administrativeAreaLevel3.mapType.value,
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
            new CommonUpdatedAdministrativeAreasLevel3Event(
                this.aggregateRoots.map(administrativeAreaLevel3 =>
                    new CommonUpdatedAdministrativeAreaLevel3Event(
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
                        administrativeAreaLevel3.mapType.value,
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
            new CommonDeletedAdministrativeAreasLevel3Event(
                this.aggregateRoots.map(administrativeAreaLevel3 =>
                    new CommonDeletedAdministrativeAreaLevel3Event(
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
                        administrativeAreaLevel3.mapType.value,
                        administrativeAreaLevel3.createdAt?.value,
                        administrativeAreaLevel3.updatedAt?.value,
                        administrativeAreaLevel3.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
