import { AuditingPaginateHttpCommunicationsQuery } from '@app/auditing/http-communication';
import { AuditingPaginateHttpCommunicationsService } from '@app/auditing/http-communication/application/paginate/auditing-paginate-http-communications.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingPaginateHttpCommunicationsQuery)
export class AuditingPaginateHttpCommunicationsQueryHandler
  implements IQueryHandler<AuditingPaginateHttpCommunicationsQuery>
{
  constructor(
    private readonly paginateHttpCommunicationsService: AuditingPaginateHttpCommunicationsService,
  ) {}

  async execute(
    query: AuditingPaginateHttpCommunicationsQuery,
  ): Promise<PaginationResponse> {
    const { total, count, rows } =
      await this.paginateHttpCommunicationsService.main(
        query.queryStatement,
        query.constraint,
        query.cQMetadata,
      );

    return new PaginationResponse(
      total,
      count,
      rows.map((item) => item.toDTO()),
    );
  }
}
