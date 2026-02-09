/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel3,
  CommonIAdministrativeAreaLevel3Repository,
  commonMockAdministrativeAreaLevel3Data,
} from '@app/common/administrative-area-level-3';
import {
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel3Code,
  CommonAdministrativeAreaLevel3CountryId,
  CommonAdministrativeAreaLevel3CreatedAt,
  CommonAdministrativeAreaLevel3CustomCode,
  CommonAdministrativeAreaLevel3DeletedAt,
  CommonAdministrativeAreaLevel3Id,
  CommonAdministrativeAreaLevel3Latitude,
  CommonAdministrativeAreaLevel3Longitude,
  CommonAdministrativeAreaLevel3MapType,
  CommonAdministrativeAreaLevel3Name,
  CommonAdministrativeAreaLevel3RowId,
  CommonAdministrativeAreaLevel3Slug,
  CommonAdministrativeAreaLevel3UpdatedAt,
  CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockAdministrativeAreaLevel3Repository
  extends MockRepository<CommonAdministrativeAreaLevel3>
  implements CommonIAdministrativeAreaLevel3Repository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'CommonAdministrativeAreaLevel3';
  public collectionSource: CommonAdministrativeAreaLevel3[];

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
      commonMockAdministrativeAreaLevel3Data
    )) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        CommonAdministrativeAreaLevel3.register(
          new CommonAdministrativeAreaLevel3Id(itemCollection.id),
          new CommonAdministrativeAreaLevel3RowId(itemCollection.rowId),
          new CommonAdministrativeAreaLevel3CountryId(itemCollection.countryId),
          new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(
            itemCollection.administrativeAreaLevel1Id,
          ),
          new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(
            itemCollection.administrativeAreaLevel2Id,
          ),
          new CommonAdministrativeAreaLevel3Code(itemCollection.code),
          new CommonAdministrativeAreaLevel3CustomCode(
            itemCollection.customCode,
          ),
          new CommonAdministrativeAreaLevel3Name(itemCollection.name),
          new CommonAdministrativeAreaLevel3Slug(itemCollection.slug),
          new CommonAdministrativeAreaLevel3Latitude(itemCollection.latitude),
          new CommonAdministrativeAreaLevel3Longitude(itemCollection.longitude),
          new CommonAdministrativeAreaLevel3Zoom(itemCollection.zoom),
          new CommonAdministrativeAreaLevel3MapType(itemCollection.mapType),
          new CommonAdministrativeAreaLevel3CreatedAt(itemCollection.createdAt),
          new CommonAdministrativeAreaLevel3UpdatedAt(itemCollection.updatedAt),
          new CommonAdministrativeAreaLevel3DeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
