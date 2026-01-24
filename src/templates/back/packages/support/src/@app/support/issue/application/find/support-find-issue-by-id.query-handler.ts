import { StorageAccountSharedAccessSignatureService } from '@app/storage-account/shared-access-signature';
import {
  SupportFindIssueByIdQuery,
  SupportIssueMapper,
  SupportIssueResponse,
} from '@app/support/issue';
import { SupportFindIssueByIdService } from '@app/support/issue/application/find/support-find-issue-by-id.service';
import { SupportIssueId } from '@app/support/issue/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportFindIssueByIdQuery)
export class SupportFindIssueByIdQueryHandler
  implements IQueryHandler<SupportFindIssueByIdQuery>
{
  private readonly mapper: SupportIssueMapper = new SupportIssueMapper();

  constructor(
    private readonly findIssueByIdService: SupportFindIssueByIdService,
    private readonly storageAccountSharedAccessSignatureService: StorageAccountSharedAccessSignatureService,
  ) {}

  async execute(
    query: SupportFindIssueByIdQuery,
  ): Promise<SupportIssueResponse> {
    const issue = await this.findIssueByIdService.main(
      new SupportIssueId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(
      issue,
      this.storageAccountSharedAccessSignatureService,
    );
  }
}
