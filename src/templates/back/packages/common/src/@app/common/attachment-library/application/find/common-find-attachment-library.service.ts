import {
  CommonAttachmentLibrary,
  CommonIAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentLibraryService {
  constructor(
    private readonly repository: CommonIAttachmentLibraryRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAttachmentLibrary> {
    return await this.repository.find({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
