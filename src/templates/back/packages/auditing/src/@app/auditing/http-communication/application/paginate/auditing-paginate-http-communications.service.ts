import {
  AuditingHttpCommunication,
  AuditingIHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingPaginateHttpCommunicationsService {
  constructor(
    private readonly repository: AuditingIHttpCommunicationRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<Pagination<AuditingHttpCommunication>> {
    return await this.repository.paginate({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
