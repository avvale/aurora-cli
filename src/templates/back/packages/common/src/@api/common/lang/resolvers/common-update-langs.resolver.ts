import { CommonUpdateLangsHandler } from '@api/common/lang';
import { CommonLang, CommonUpdateLangsInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.lang.update')
export class CommonUpdateLangsResolver {
  constructor(private readonly handler: CommonUpdateLangsHandler) {}

  @Mutation('commonUpdateLangs')
  async main(
    @Args('payload') payload: CommonUpdateLangsInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonLang> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
