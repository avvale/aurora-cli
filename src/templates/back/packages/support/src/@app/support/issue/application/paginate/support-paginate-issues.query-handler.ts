import { StorageAccountSharedAccessSignatureService } from '@app/storage-account/shared-access-signature';
import {
  SupportIssueMapper,
  SupportPaginateIssuesQuery,
} from '@app/support/issue';
import { SupportPaginateIssuesService } from '@app/support/issue/application/paginate/support-paginate-issues.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportPaginateIssuesQuery)
export class SupportPaginateIssuesQueryHandler
  implements IQueryHandler<SupportPaginateIssuesQuery>
{
  private readonly mapper: SupportIssueMapper = new SupportIssueMapper();

  constructor(
    private readonly paginateIssuesService: SupportPaginateIssuesService,
    private readonly storageAccountSharedAccessSignatureService: StorageAccountSharedAccessSignatureService,
  ) {}

  async execute(
    query: SupportPaginateIssuesQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } = await this.paginateIssuesService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return new PaginationResponse(
      total,
      count,
      this.mapper.mapAggregatesToResponses(
        rows,
        this.storageAccountSharedAccessSignatureService,
      ),
    );
  }
}
