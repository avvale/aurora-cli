import {
  CommonAttachmentFamily,
  CommonIAttachmentFamilyRepository,
} from '@app/common/attachment-family';
import { CommonAttachmentFamilyId } from '@app/common/attachment-family/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAttachmentFamilyByIdService {
  constructor(private readonly repository: CommonIAttachmentFamilyRepository) {}

  async main(
    id: CommonAttachmentFamilyId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonAttachmentFamily> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
