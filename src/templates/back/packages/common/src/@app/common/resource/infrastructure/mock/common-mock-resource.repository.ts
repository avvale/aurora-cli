import {
  CommonIResourceRepository,
  commonMockResourceData,
  CommonResource,
} from '@app/common/resource';
import {
  CommonResourceCode,
  CommonResourceCreatedAt,
  CommonResourceDeletedAt,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
  CommonResourceUpdatedAt,
} from '@app/common/resource/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockResourceRepository
  extends MockRepository<CommonResource>
  implements CommonIResourceRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'CommonResource';
  public collectionSource: CommonResource[];

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

    for (const itemCollection of <any[]>commonMockResourceData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        CommonResource.register(
          new CommonResourceId(itemCollection.id),
          new CommonResourceCode(itemCollection.code),
          new CommonResourceName(itemCollection.name),
          new CommonResourceIsActive(itemCollection.isActive),
          new CommonResourceHasAttachments(itemCollection.hasAttachments),
          new CommonResourceCreatedAt(itemCollection.createdAt),
          new CommonResourceUpdatedAt(itemCollection.updatedAt),
          new CommonResourceDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
