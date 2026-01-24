import { CommonDeleteResourceByIdHandler } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.delete')
export class CommonDeleteResourceByIdResolver {
  constructor(private readonly handler: CommonDeleteResourceByIdHandler) {}

  @Mutation('commonDeleteResourceById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonResource> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
