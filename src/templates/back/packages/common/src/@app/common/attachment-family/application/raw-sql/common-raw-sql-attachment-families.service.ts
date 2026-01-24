import {
  CommonAttachmentFamily,
  CommonIAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLAttachmentFamiliesService {
  constructor(private readonly repository: CommonIAttachmentFamilyRepository) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAttachmentFamily[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
