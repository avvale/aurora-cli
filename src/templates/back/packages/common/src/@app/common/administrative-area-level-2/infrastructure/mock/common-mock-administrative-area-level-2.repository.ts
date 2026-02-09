/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonIAdministrativeAreaLevel2Repository,
  commonMockAdministrativeAreaLevel2Data,
} from '@app/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel2Code,
  CommonAdministrativeAreaLevel2CountryId,
  CommonAdministrativeAreaLevel2CreatedAt,
  CommonAdministrativeAreaLevel2CustomCode,
  CommonAdministrativeAreaLevel2DeletedAt,
  CommonAdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel2Latitude,
  CommonAdministrativeAreaLevel2Longitude,
  CommonAdministrativeAreaLevel2MapType,
  CommonAdministrativeAreaLevel2Name,
  CommonAdministrativeAreaLevel2RowId,
  CommonAdministrativeAreaLevel2Slug,
  CommonAdministrativeAreaLevel2UpdatedAt,
  CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockAdministrativeAreaLevel2Repository
  extends MockRepository<CommonAdministrativeAreaLevel2>
  implements CommonIAdministrativeAreaLevel2Repository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'CommonAdministrativeAreaLevel2';
  public collectionSource: CommonAdministrativeAreaLevel2[];

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
      commonMockAdministrativeAreaLevel2Data
    )) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        CommonAdministrativeAreaLevel2.register(
          new CommonAdministrativeAreaLevel2Id(itemCollection.id),
          new CommonAdministrativeAreaLevel2RowId(itemCollection.rowId),
          new CommonAdministrativeAreaLevel2CountryId(itemCollection.countryId),
          new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(
            itemCollection.administrativeAreaLevel1Id,
          ),
          new CommonAdministrativeAreaLevel2Code(itemCollection.code),
          new CommonAdministrativeAreaLevel2CustomCode(
            itemCollection.customCode,
          ),
          new CommonAdministrativeAreaLevel2Name(itemCollection.name),
          new CommonAdministrativeAreaLevel2Slug(itemCollection.slug),
          new CommonAdministrativeAreaLevel2Latitude(itemCollection.latitude),
          new CommonAdministrativeAreaLevel2Longitude(itemCollection.longitude),
          new CommonAdministrativeAreaLevel2Zoom(itemCollection.zoom),
          new CommonAdministrativeAreaLevel2MapType(itemCollection.mapType),
          new CommonAdministrativeAreaLevel2CreatedAt(itemCollection.createdAt),
          new CommonAdministrativeAreaLevel2UpdatedAt(itemCollection.updatedAt),
          new CommonAdministrativeAreaLevel2DeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
