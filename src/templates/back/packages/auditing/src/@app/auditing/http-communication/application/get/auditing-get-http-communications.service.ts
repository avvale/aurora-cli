import {
  AuditingHttpCommunication,
  AuditingIHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingGetHttpCommunicationsService {
  constructor(
    private readonly repository: AuditingIHttpCommunicationRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<AuditingHttpCommunication[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
