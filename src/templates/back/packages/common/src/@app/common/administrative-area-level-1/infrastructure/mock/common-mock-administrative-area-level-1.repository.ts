/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1,
  CommonIAdministrativeAreaLevel1Repository,
  commonMockAdministrativeAreaLevel1Data,
} from '@app/common/administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel1Code,
  CommonAdministrativeAreaLevel1CountryId,
  CommonAdministrativeAreaLevel1CreatedAt,
  CommonAdministrativeAreaLevel1CustomCode,
  CommonAdministrativeAreaLevel1DeletedAt,
  CommonAdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel1Latitude,
  CommonAdministrativeAreaLevel1Longitude,
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel1Name,
  CommonAdministrativeAreaLevel1RowId,
  CommonAdministrativeAreaLevel1Slug,
  CommonAdministrativeAreaLevel1UpdatedAt,
  CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockAdministrativeAreaLevel1Repository
  extends MockRepository<CommonAdministrativeAreaLevel1>
  implements CommonIAdministrativeAreaLevel1Repository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'CommonAdministrativeAreaLevel1';
  public collectionSource: CommonAdministrativeAreaLevel1[];

  constructor() {
    super();
    this.createSourceMockData();
  }

  public reset(): void {
    this.createSourceMockData();
  }

  private createSourceMockData(): void {
    this.collectionSource = [];
    const now = Utils.nowTimestamp();

    for (const itemCollection of <any[]>(
      commonMockAdministrativeAreaLevel1Data
    )) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        CommonAdministrativeAreaLevel1.register(
          new CommonAdministrativeAreaLevel1Id(itemCollection.id),
          new CommonAdministrativeAreaLevel1RowId(itemCollection.rowId),
          new CommonAdministrativeAreaLevel1CountryId(itemCollection.countryId),
          new CommonAdministrativeAreaLevel1Code(itemCollection.code),
          new CommonAdministrativeAreaLevel1CustomCode(
            itemCollection.customCode,
          ),
          new CommonAdministrativeAreaLevel1Name(itemCollection.name),
          new CommonAdministrativeAreaLevel1Slug(itemCollection.slug),
          new CommonAdministrativeAreaLevel1Latitude(itemCollection.latitude),
          new CommonAdministrativeAreaLevel1Longitude(itemCollection.longitude),
          new CommonAdministrativeAreaLevel1Zoom(itemCollection.zoom),
          new CommonAdministrativeAreaLevel1MapType(itemCollection.mapType),
          new CommonAdministrativeAreaLevel1CreatedAt(itemCollection.createdAt),
          new CommonAdministrativeAreaLevel1UpdatedAt(itemCollection.updatedAt),
          new CommonAdministrativeAreaLevel1DeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
