import { MessageOutbox } from '@api/graphql';
import { MessageOutboxDto } from '@api/message/outbox';
import {
  MessageDeleteOutboxesCommand,
  MessageGetOutboxesQuery,
} from '@app/message/outbox';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageDeleteOutboxesHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<MessageOutbox[] | MessageOutboxDto[]> {
    const outboxes = await this.queryBus.ask(
      new MessageGetOutboxesQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new MessageDeleteOutboxesCommand(queryStatement, constraint, {
        timezone,
        repositoryOptions: {
          auditing,
        },
      }),
    );

    return outboxes;
  }
}
