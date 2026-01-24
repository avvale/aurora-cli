import { CommonFindAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.get')
export class CommonFindAttachmentLibraryByIdResolver {
  constructor(
    private readonly handler: CommonFindAttachmentLibraryByIdHandler,
  ) {}

  @Query('commonFindAttachmentLibraryById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAttachmentLibrary> {
    return await this.handler.main(id, constraint, timezone);
  }
}
