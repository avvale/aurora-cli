import { CommonUpdateCountryByIdHandler } from '@api/common/country';
import { CommonCountry, CommonUpdateCountryByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  ContentLanguage,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.update')
export class CommonUpdateCountryByIdResolver {
  constructor(private readonly handler: CommonUpdateCountryByIdHandler) {}

  @Mutation('commonUpdateCountryById')
  async main(
    @Args('payload') payload: CommonUpdateCountryByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonCountry> {
    return await this.handler.main(
      payload,
      constraint,
      timezone,
      contentLanguage,
      auditing,
    );
  }
}
