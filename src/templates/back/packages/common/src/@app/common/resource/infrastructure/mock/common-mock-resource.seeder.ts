/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { commonMockResourceData, CommonResource } from '@app/common/resource';
import {
  CommonResourceCode,
  CommonResourceCreatedAt,
  CommonResourceDeletedAt,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
  CommonResourceRowId,
  CommonResourceUpdatedAt,
} from '@app/common/resource/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CommonMockResourceSeeder extends MockSeeder<CommonResource> {
  public collectionSource: CommonResource[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const resource of _.orderBy(commonMockResourceData, ['id'])) {
      this.collectionSource.push(
        CommonResource.register(
          new CommonResourceId(resource.id),
          new CommonResourceRowId(resource.rowId),
          new CommonResourceCode(resource.code),
          new CommonResourceName(resource.name),
          new CommonResourceIsActive(resource.isActive),
          new CommonResourceHasAttachments(resource.hasAttachments),
          new CommonResourceCreatedAt({ currentTimestamp: true }),
          new CommonResourceUpdatedAt({ currentTimestamp: true }),
          new CommonResourceDeletedAt(null),
        ),
      );
    }
  }
}
