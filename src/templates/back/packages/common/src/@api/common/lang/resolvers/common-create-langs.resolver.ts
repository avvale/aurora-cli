import { CommonCreateLangsHandler } from '@api/common/lang';
import { CommonCreateLangInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.lang.create')
export class CommonCreateLangsResolver {
  constructor(private readonly handler: CommonCreateLangsHandler) {}

  @Mutation('commonCreateLangs')
  async main(
    @Args('payload') payload: CommonCreateLangInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
