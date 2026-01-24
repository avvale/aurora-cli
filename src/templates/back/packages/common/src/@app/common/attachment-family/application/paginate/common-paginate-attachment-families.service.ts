import {
  CommonAttachmentFamily,
  CommonIAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAttachmentFamiliesService {
  constructor(private readonly repository: CommonIAttachmentFamilyRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<CommonAttachmentFamily>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
