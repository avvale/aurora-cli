import { CommonDeleteAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { CommonAttachmentLibrary } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.delete')
export class CommonDeleteAttachmentLibrariesResolver {
  constructor(
    private readonly handler: CommonDeleteAttachmentLibrariesHandler,
  ) {}

  @Mutation('commonDeleteAttachmentLibraries')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachmentLibrary[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
