import { CommonUpdateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import {
  CommonAttachmentFamily,
  CommonUpdateAttachmentFamiliesInput,
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
@Auth('common.attachmentFamily.update')
export class CommonUpdateAttachmentFamiliesResolver {
  constructor(
    private readonly handler: CommonUpdateAttachmentFamiliesHandler,
  ) {}

  @Mutation('commonUpdateAttachmentFamilies')
  async main(
    @Args('payload') payload: CommonUpdateAttachmentFamiliesInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachmentFamily> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
