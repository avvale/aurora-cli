import { SupportComment } from '@api/graphql';
import { SupportFindCommentByIdHandler } from '@api/support/comment';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('support.comment.get')
export class SupportFindCommentByIdResolver {
  constructor(private readonly handler: SupportFindCommentByIdHandler) {}

  @Query('supportFindCommentById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<SupportComment> {
    return await this.handler.main(id, constraint, timezone);
  }
}
