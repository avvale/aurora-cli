import {
  SupportAddCommentsContextEvent,
  SupportICommentRepository,
} from '@app/support/comment';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class SupportDeleteCommentsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SupportICommentRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const comments = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (comments.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddCommentsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const commentsRegistered = this.publisher.mergeObjectContext(
      new SupportAddCommentsContextEvent(comments, cQMetadata),
    );

    commentsRegistered.deleted(); // apply event to model events
    commentsRegistered.commit(); // commit all events of model
  }
}
