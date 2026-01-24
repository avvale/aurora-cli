import { SupportComment } from '@api/graphql';
import { SupportDeleteCommentsHandler } from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.comment.delete')
export class SupportDeleteCommentsResolver {
  constructor(private readonly handler: SupportDeleteCommentsHandler) {}

  @Mutation('supportDeleteComments')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<SupportComment[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
