import { AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingHttpCommunicationId } from '@app/auditing/http-communication/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingDeleteHttpCommunicationByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: AuditingIHttpCommunicationRepository,
  ) {}

  async main(
    id: AuditingHttpCommunicationId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const httpCommunication = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(httpCommunication.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const httpCommunicationRegister =
      this.publisher.mergeObjectContext(httpCommunication);

    httpCommunicationRegister.deleted({
      payload: httpCommunication,
      cQMetadata,
    }); // apply event to model events
    httpCommunicationRegister.commit(); // commit all events of model
  }
}
