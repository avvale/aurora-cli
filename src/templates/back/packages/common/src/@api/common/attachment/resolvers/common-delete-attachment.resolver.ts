import { CommonDeleteAttachmentHandler } from '@api/common/attachment';
import { CommonAttachment, CommonAttachmentInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.delete')
export class CommonDeleteAttachmentResolver {
  constructor(private readonly handler: CommonDeleteAttachmentHandler) {}

  @Mutation('commonDeleteAttachment')
  async main(
    @Args('payload') payload: CommonAttachmentInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachment> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
