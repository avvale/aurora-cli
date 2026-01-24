import { CommonCreateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { CommonCreateAttachmentFamilyInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.create')
export class CommonCreateAttachmentFamiliesResolver {
  constructor(
    private readonly handler: CommonCreateAttachmentFamiliesHandler,
  ) {}

  @Mutation('commonCreateAttachmentFamilies')
  async main(
    @Args('payload') payload: CommonCreateAttachmentFamilyInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
