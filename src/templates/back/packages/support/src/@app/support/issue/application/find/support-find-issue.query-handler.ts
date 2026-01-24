import { StorageAccountSharedAccessSignatureService } from '@app/storage-account/shared-access-signature';
import {
  SupportFindIssueQuery,
  SupportIssueMapper,
  SupportIssueResponse,
} from '@app/support/issue';
import { SupportFindIssueService } from '@app/support/issue/application/find/support-find-issue.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportFindIssueQuery)
export class SupportFindIssueQueryHandler
  implements IQueryHandler<SupportFindIssueQuery>
{
  private readonly mapper: SupportIssueMapper = new SupportIssueMapper();

  constructor(
    private readonly findIssueService: SupportFindIssueService,
    private readonly storageAccountSharedAccessSignatureService: StorageAccountSharedAccessSignatureService,
  ) {}

  async execute(query: SupportFindIssueQuery): Promise<SupportIssueResponse> {
    const issue = await this.findIssueService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(
      issue,
      this.storageAccountSharedAccessSignatureService,
    );
  }
}
