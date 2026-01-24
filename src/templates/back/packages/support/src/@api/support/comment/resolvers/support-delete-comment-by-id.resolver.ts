import { SupportComment } from '@api/graphql';
import { SupportDeleteCommentByIdHandler } from '@api/support/comment';
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
export class SupportDeleteCommentByIdResolver {
  constructor(private readonly handler: SupportDeleteCommentByIdHandler) {}

  @Mutation('supportDeleteCommentById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<SupportComment> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
