import { SupportIIssueRepository, SupportIssue } from '@app/support/issue';
import { SupportIssueId } from '@app/support/issue/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportFindIssueByIdService {
  constructor(private readonly repository: SupportIIssueRepository) {}

  async main(
    id: SupportIssueId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<SupportIssue> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
