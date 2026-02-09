/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1,
  CommonCreatedAdministrativeAreaLevel1Event,
  CommonCreatedAdministrativeAreasLevel1Event,
} from '@app/common/administrative-area-level-1';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAdministrativeAreasLevel1ContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonAdministrativeAreaLevel1[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAdministrativeAreasLevel1Event({
        payload: this.aggregateRoots.map(
          (administrativeAreaLevel1) =>
            new CommonCreatedAdministrativeAreaLevel1Event({
              payload: {
                id: administrativeAreaLevel1.id.value,
                countryId: administrativeAreaLevel1.countryId.value,
                code: administrativeAreaLevel1.code.value,
                customCode: administrativeAreaLevel1.customCode?.value,
                name: administrativeAreaLevel1.name.value,
                slug: administrativeAreaLevel1.slug.value,
                latitude: administrativeAreaLevel1.latitude?.value,
                longitude: administrativeAreaLevel1.longitude?.value,
                zoom: administrativeAreaLevel1.zoom?.value,
                mapType: administrativeAreaLevel1.mapType?.value,
                createdAt: administrativeAreaLevel1.createdAt?.value,
                updatedAt: administrativeAreaLevel1.updatedAt?.value,
                deletedAt: administrativeAreaLevel1.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
