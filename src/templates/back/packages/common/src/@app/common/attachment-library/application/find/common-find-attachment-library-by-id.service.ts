import {
  CommonAttachmentLibrary,
  CommonIAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonAttachmentLibraryId } from '@app/common/attachment-library/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentLibraryByIdService {
  constructor(
    private readonly repository: CommonIAttachmentLibraryRepository,
  ) {}

  async main(
    id: CommonAttachmentLibraryId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAttachmentLibrary> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
