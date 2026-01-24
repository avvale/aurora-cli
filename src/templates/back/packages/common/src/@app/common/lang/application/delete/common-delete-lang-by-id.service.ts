import { CommonILangRepository } from '@app/common/lang';
import { CommonLangId } from '@app/common/lang/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonDeleteLangByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonILangRepository,
  ) {}

  async main(
    id: CommonLangId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const lang = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(lang.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const langRegister = this.publisher.mergeObjectContext(lang);

    langRegister.deleted(lang); // apply event to model events
    langRegister.commit(); // commit all events of model
  }
}
