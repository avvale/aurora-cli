import { CommonUpdateAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import {
  CommonAttachmentLibrary,
  CommonUpdateAttachmentLibraryByIdInput,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.update')
export class CommonUpdateAttachmentLibraryByIdResolver {
  constructor(
    private readonly handler: CommonUpdateAttachmentLibraryByIdHandler,
  ) {}

  @Mutation('commonUpdateAttachmentLibraryById')
  async main(
    @Args('payload') payload: CommonUpdateAttachmentLibraryByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachmentLibrary> {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
