import {
  AuditingHttpCommunication,
  AuditingIHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingHttpCommunicationId } from '@app/auditing/http-communication/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingFindHttpCommunicationByIdService {
  constructor(
    private readonly repository: AuditingIHttpCommunicationRepository,
  ) {}

  async main(
    id: AuditingHttpCommunicationId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<AuditingHttpCommunication> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
