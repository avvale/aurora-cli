import { CommonDeleteAttachmentByIdHandler } from '@api/common/attachment';
import { CommonAttachment } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.attachment.delete')
export class CommonDeleteAttachmentByIdResolver {
  constructor(private readonly handler: CommonDeleteAttachmentByIdHandler) {}

  @Mutation('commonDeleteAttachmentById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAttachment> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
