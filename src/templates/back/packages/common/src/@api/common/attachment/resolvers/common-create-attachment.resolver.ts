import { CommonCreateAttachmentHandler } from '@api/common/attachment';
import { CommonAttachment, CommonCreateAttachmentInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.create')
export class CommonCreateAttachmentResolver {
  constructor(private readonly handler: CommonCreateAttachmentHandler) {}

  @Mutation('commonCreateAttachment')
  async main(
    @Args('payload') payload: CommonCreateAttachmentInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachment> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
