import { CommonCreateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { CommonCreateAttachmentLibraryInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentLibrary.create')
export class CommonCreateAttachmentLibrariesResolver {
  constructor(
    private readonly handler: CommonCreateAttachmentLibrariesHandler,
  ) {}

  @Mutation('commonCreateAttachmentLibraries')
  async main(
    @Args('payload') payload: CommonCreateAttachmentLibraryInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
