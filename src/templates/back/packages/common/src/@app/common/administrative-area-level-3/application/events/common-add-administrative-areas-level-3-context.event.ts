/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3,
  CommonCreatedAdministrativeAreaLevel3Event,
  CommonCreatedAdministrativeAreasLevel3Event,
} from '@app/common/administrative-area-level-3';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAdministrativeAreasLevel3ContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonAdministrativeAreaLevel3[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAdministrativeAreasLevel3Event({
        payload: this.aggregateRoots.map(
          (administrativeAreaLevel3) =>
            new CommonCreatedAdministrativeAreaLevel3Event({
              payload: {
                id: administrativeAreaLevel3.id.value,
                countryId: administrativeAreaLevel3.countryId.value,
                administrativeAreaLevel1Id:
                  administrativeAreaLevel3.administrativeAreaLevel1Id.value,
                administrativeAreaLevel2Id:
                  administrativeAreaLevel3.administrativeAreaLevel2Id.value,
                code: administrativeAreaLevel3.code.value,
                customCode: administrativeAreaLevel3.customCode?.value,
                name: administrativeAreaLevel3.name.value,
                slug: administrativeAreaLevel3.slug.value,
                latitude: administrativeAreaLevel3.latitude?.value,
                longitude: administrativeAreaLevel3.longitude?.value,
                zoom: administrativeAreaLevel3.zoom?.value,
                mapType: administrativeAreaLevel3.mapType?.value,
                createdAt: administrativeAreaLevel3.createdAt?.value,
                updatedAt: administrativeAreaLevel3.updatedAt?.value,
                deletedAt: administrativeAreaLevel3.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
