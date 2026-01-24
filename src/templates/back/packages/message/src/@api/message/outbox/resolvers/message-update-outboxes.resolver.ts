import { MessageOutbox, MessageUpdateOutboxesInput } from '@api/graphql';
import { MessageUpdateOutboxesHandler } from '@api/message/outbox';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.outbox.update')
export class MessageUpdateOutboxesResolver {
  constructor(private readonly handler: MessageUpdateOutboxesHandler) {}

  @Mutation('messageUpdateOutboxes')
  async main(
    @Args('payload') payload: MessageUpdateOutboxesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<MessageOutbox> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
