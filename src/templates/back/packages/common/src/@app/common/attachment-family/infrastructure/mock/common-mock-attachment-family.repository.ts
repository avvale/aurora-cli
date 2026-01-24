import {
  CommonAttachmentFamily,
  CommonIAttachmentFamilyRepository,
  commonMockAttachmentFamilyData,
} from '@app/common/attachment-family';
import {
  CommonAttachmentFamilyCode,
  CommonAttachmentFamilyCreatedAt,
  CommonAttachmentFamilyDeletedAt,
  CommonAttachmentFamilyFitType,
  CommonAttachmentFamilyFormat,
  CommonAttachmentFamilyHeight,
  CommonAttachmentFamilyId,
  CommonAttachmentFamilyName,
  CommonAttachmentFamilyQuality,
  CommonAttachmentFamilyResourceId,
  CommonAttachmentFamilySizes,
  CommonAttachmentFamilyUpdatedAt,
  CommonAttachmentFamilyWidth,
} from '@app/common/attachment-family/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonMockAttachmentFamilyRepository
  extends MockRepository<CommonAttachmentFamily>
  implements CommonIAttachmentFamilyRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'CommonAttachmentFamily';
  public collectionSource: CommonAttachmentFamily[];

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

    for (const itemCollection of <any[]>commonMockAttachmentFamilyData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        CommonAttachmentFamily.register(
          new CommonAttachmentFamilyId(itemCollection.id),
          new CommonAttachmentFamilyResourceId(itemCollection.resourceId),
          new CommonAttachmentFamilyCode(itemCollection.code),
          new CommonAttachmentFamilyName(itemCollection.name),
          new CommonAttachmentFamilyWidth(itemCollection.width),
          new CommonAttachmentFamilyHeight(itemCollection.height),
          new CommonAttachmentFamilyFitType(itemCollection.fitType),
          new CommonAttachmentFamilyQuality(itemCollection.quality),
          new CommonAttachmentFamilySizes(itemCollection.sizes),
          new CommonAttachmentFamilyFormat(itemCollection.format),
          new CommonAttachmentFamilyCreatedAt(itemCollection.createdAt),
          new CommonAttachmentFamilyUpdatedAt(itemCollection.updatedAt),
          new CommonAttachmentFamilyDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
