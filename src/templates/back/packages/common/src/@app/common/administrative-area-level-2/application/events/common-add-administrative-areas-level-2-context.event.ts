/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonCreatedAdministrativeAreaLevel2Event,
  CommonCreatedAdministrativeAreasLevel2Event,
} from '@app/common/administrative-area-level-2';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddAdministrativeAreasLevel2ContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonAdministrativeAreaLevel2[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedAdministrativeAreasLevel2Event({
        payload: this.aggregateRoots.map(
          (administrativeAreaLevel2) =>
            new CommonCreatedAdministrativeAreaLevel2Event({
              payload: {
                id: administrativeAreaLevel2.id.value,
                countryId: administrativeAreaLevel2.countryId.value,
                administrativeAreaLevel1Id:
                  administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                code: administrativeAreaLevel2.code.value,
                customCode: administrativeAreaLevel2.customCode?.value,
                name: administrativeAreaLevel2.name.value,
                slug: administrativeAreaLevel2.slug.value,
                latitude: administrativeAreaLevel2.latitude?.value,
                longitude: administrativeAreaLevel2.longitude?.value,
                zoom: administrativeAreaLevel2.zoom?.value,
                mapType: administrativeAreaLevel2.mapType?.value,
                createdAt: administrativeAreaLevel2.createdAt?.value,
                updatedAt: administrativeAreaLevel2.updatedAt?.value,
                deletedAt: administrativeAreaLevel2.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
