import { CommonDeleteAttachmentFamilyByIdHandler } from '@api/common/attachment-family';
import { CommonAttachmentFamily } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachmentFamily.delete')
export class CommonDeleteAttachmentFamilyByIdResolver {
  constructor(
    private readonly handler: CommonDeleteAttachmentFamilyByIdHandler,
  ) {}

  @Mutation('commonDeleteAttachmentFamilyById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachmentFamily> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
