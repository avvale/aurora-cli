import { SupportComment } from '@api/graphql';
import { SupportFindCommentHandler } from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.comment.get')
export class SupportFindCommentResolver {
  constructor(private readonly handler: SupportFindCommentHandler) {}

  @Query('supportFindComment')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<SupportComment> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
