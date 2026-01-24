import {
  CommonAttachmentFamily,
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAttachmentFamilySeeder extends MockSeeder<CommonAttachmentFamily> {
  public collectionSource: CommonAttachmentFamily[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const attachmentFamily of _.orderBy(commonMockAttachmentFamilyData, [
      'id',
    ])) {
      this.collectionSource.push(
        CommonAttachmentFamily.register(
          new CommonAttachmentFamilyId(attachmentFamily.id),
          new CommonAttachmentFamilyResourceId(attachmentFamily.resourceId),
          new CommonAttachmentFamilyCode(attachmentFamily.code),
          new CommonAttachmentFamilyName(attachmentFamily.name),
          new CommonAttachmentFamilyWidth(attachmentFamily.width),
          new CommonAttachmentFamilyHeight(attachmentFamily.height),
          new CommonAttachmentFamilyFitType(attachmentFamily.fitType),
          new CommonAttachmentFamilyQuality(attachmentFamily.quality),
          new CommonAttachmentFamilySizes(attachmentFamily.sizes),
          new CommonAttachmentFamilyFormat(attachmentFamily.format),
          new CommonAttachmentFamilyCreatedAt({ currentTimestamp: true }),
          new CommonAttachmentFamilyUpdatedAt({ currentTimestamp: true }),
          new CommonAttachmentFamilyDeletedAt(null),
        ),
      );
    }
  }
}
