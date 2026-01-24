import { SupportICommentRepository } from '@app/support/comment';
import { SupportCommentId } from '@app/support/comment/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class SupportDeleteCommentByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SupportICommentRepository,
  ) {}

  async main(
    id: SupportCommentId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const comment = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(comment.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const commentRegister = this.publisher.mergeObjectContext(comment);

    commentRegister.deleted({
      payload: comment,
      cQMetadata,
    }); // apply event to model events
    commentRegister.commit(); // commit all events of model
  }
}
