import {
  SupportComment,
  SupportICommentRepository,
} from '@app/support/comment';
import { SupportCommentId } from '@app/support/comment/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportFindCommentByIdService {
  constructor(private readonly repository: SupportICommentRepository) {}

  async main(
    id: SupportCommentId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<SupportComment> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
