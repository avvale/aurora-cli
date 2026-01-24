import { CommonCreateCountryHandler } from '@api/common/country';
import { CommonCountry, CommonCreateCountryInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  ContentLanguage,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.create')
export class CommonCreateCountryResolver {
  constructor(private readonly handler: CommonCreateCountryHandler) {}

  @Mutation('commonCreateCountry')
  async main(
    @Args('payload') payload: CommonCreateCountryInput,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonCountry> {
    return await this.handler.main(
      payload,
      timezone,
      contentLanguage,
      auditing,
    );
  }
}
