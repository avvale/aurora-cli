import {
  CommonAttachment,
  CommonIAttachmentRepository,
} from '@app/common/attachment';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLAttachmentsService {
  constructor(private readonly repository: CommonIAttachmentRepository) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAttachment[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
