import { CommonCreateCountriesHandler } from '@api/common/country';
import { CommonCreateCountryInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.create')
export class CommonCreateCountriesResolver {
  constructor(private readonly handler: CommonCreateCountriesHandler) {}

  @Mutation('commonCreateCountries')
  async main(
    @Args('payload') payload: CommonCreateCountryInput[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
