import { CommonDeleteAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
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
export class CommonDeleteAttachmentLibraryByIdResolver {
  constructor(
    private readonly handler: CommonDeleteAttachmentLibraryByIdHandler,
  ) {}

  @Mutation('commonDeleteAttachmentLibraryById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachmentLibrary> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
