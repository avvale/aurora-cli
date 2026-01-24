import { CommonUpsertAttachmentFamilyHandler } from '@api/common/attachment-family';
import {
  CommonAttachmentFamily,
  CommonUpdateAttachmentFamilyByIdInput,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.upsert')
export class CommonUpsertAttachmentFamilyResolver {
  constructor(private readonly handler: CommonUpsertAttachmentFamilyHandler) {}

  @Mutation('commonUpsertAttachmentFamily')
  async main(
    @Args('payload') payload: CommonUpdateAttachmentFamilyByIdInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachmentFamily> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
