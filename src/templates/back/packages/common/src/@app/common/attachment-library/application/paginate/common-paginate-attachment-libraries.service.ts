import {
  CommonAttachmentLibrary,
  CommonIAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAttachmentLibrariesService {
  constructor(
    private readonly repository: CommonIAttachmentLibraryRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<CommonAttachmentLibrary>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
