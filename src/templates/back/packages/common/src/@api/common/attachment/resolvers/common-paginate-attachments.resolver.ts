import { CommonPaginateAttachmentsHandler } from '@api/common/attachment';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.get')
export class CommonPaginateAttachmentsResolver {
  constructor(private readonly handler: CommonPaginateAttachmentsHandler) {}

  @Query('commonPaginateAttachments')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
