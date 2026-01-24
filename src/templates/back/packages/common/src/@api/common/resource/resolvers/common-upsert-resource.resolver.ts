import { CommonUpsertResourceHandler } from '@api/common/resource';
import { CommonResource, CommonUpdateResourceByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.upsert')
export class CommonUpsertResourceResolver {
  constructor(private readonly handler: CommonUpsertResourceHandler) {}

  @Mutation('commonUpsertResource')
  async main(
    @Args('payload') payload: CommonUpdateResourceByIdInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonResource> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
