/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CommonCreateResourceHandler } from '@api/common/resource';
import { CommonCreateResourceInput, CommonResource } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.resource.create')
export class CommonCreateResourceResolver {
  constructor(private readonly handler: CommonCreateResourceHandler) {}

  @Mutation('commonCreateResource')
  async main(
    @Args('payload') payload: CommonCreateResourceInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonResource> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
