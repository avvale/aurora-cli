import {
  CommonAdministrativeAreaLevel2,
  CommonCreatedAdministrativeAreaLevel2Event,
  CommonCreatedAdministrativeAreasLevel2Event,
  CommonDeletedAdministrativeAreaLevel2Event,
  CommonDeletedAdministrativeAreasLevel2Event,
  CommonUpdatedAdministrativeAreaLevel2Event,
  CommonUpdatedAdministrativeAreasLevel2Event,
} from '@app/common/administrative-area-level-2';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAdministrativeAreasLevel2ContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonAdministrativeAreaLevel2[] = [],
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAdministrativeAreasLevel2Event(
        this.aggregateRoots.map(
          (administrativeAreaLevel2) =>
            new CommonCreatedAdministrativeAreaLevel2Event(
              administrativeAreaLevel2.id.value,
              administrativeAreaLevel2.countryId.value,
              administrativeAreaLevel2.administrativeAreaLevel1Id.value,
              administrativeAreaLevel2.code.value,
              administrativeAreaLevel2.customCode?.value,
              administrativeAreaLevel2.name.value,
              administrativeAreaLevel2.slug.value,
              administrativeAreaLevel2.latitude?.value,
              administrativeAreaLevel2.longitude?.value,
              administrativeAreaLevel2.zoom?.value,
              administrativeAreaLevel2.mapType?.value,
              administrativeAreaLevel2.createdAt?.value,
              administrativeAreaLevel2.updatedAt?.value,
              administrativeAreaLevel2.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  updated(): void {
    this.apply(
      new CommonUpdatedAdministrativeAreasLevel2Event(
        this.aggregateRoots.map(
          (administrativeAreaLevel2) =>
            new CommonUpdatedAdministrativeAreaLevel2Event(
              administrativeAreaLevel2.id.value,
              administrativeAreaLevel2.countryId.value,
              administrativeAreaLevel2.administrativeAreaLevel1Id.value,
              administrativeAreaLevel2.code.value,
              administrativeAreaLevel2.customCode?.value,
              administrativeAreaLevel2.name.value,
              administrativeAreaLevel2.slug.value,
              administrativeAreaLevel2.latitude?.value,
              administrativeAreaLevel2.longitude?.value,
              administrativeAreaLevel2.zoom?.value,
              administrativeAreaLevel2.mapType?.value,
              administrativeAreaLevel2.createdAt?.value,
              administrativeAreaLevel2.updatedAt?.value,
              administrativeAreaLevel2.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  deleted(): void {
    this.apply(
      new CommonDeletedAdministrativeAreasLevel2Event(
        this.aggregateRoots.map(
          (administrativeAreaLevel2) =>
            new CommonDeletedAdministrativeAreaLevel2Event(
              administrativeAreaLevel2.id.value,
              administrativeAreaLevel2.countryId.value,
              administrativeAreaLevel2.administrativeAreaLevel1Id.value,
              administrativeAreaLevel2.code.value,
              administrativeAreaLevel2.customCode?.value,
              administrativeAreaLevel2.name.value,
              administrativeAreaLevel2.slug.value,
              administrativeAreaLevel2.latitude?.value,
              administrativeAreaLevel2.longitude?.value,
              administrativeAreaLevel2.zoom?.value,
              administrativeAreaLevel2.mapType?.value,
              administrativeAreaLevel2.createdAt?.value,
              administrativeAreaLevel2.updatedAt?.value,
              administrativeAreaLevel2.deletedAt?.value,
            ),
        ),
      ),
    );
  }
}
