import { CommonFindAttachmentByIdHandler } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.get')
export class CommonFindAttachmentByIdResolver {
  constructor(private readonly handler: CommonFindAttachmentByIdHandler) {}

  @Query('commonFindAttachmentById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAttachment> {
    return await this.handler.main(id, constraint, timezone);
  }
}
