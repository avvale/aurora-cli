import {
  CommonAttachmentLibrary,
  CommonIAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLAttachmentLibrariesService {
  constructor(
    private readonly repository: CommonIAttachmentLibraryRepository,
  ) {}

  async main(
    rawSQL?: string,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAttachmentLibrary[]> {
    return await this.repository.rawSQL({
      rawSQL,
      cQMetadata,
    });
  }
}
