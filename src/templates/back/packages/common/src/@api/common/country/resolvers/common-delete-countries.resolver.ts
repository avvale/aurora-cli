import { CommonDeleteCountriesHandler } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
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
@Auth('common.country.delete')
export class CommonDeleteCountriesResolver {
  constructor(private readonly handler: CommonDeleteCountriesHandler) {}

  @Mutation('commonDeleteCountries')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonCountry[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      contentLanguage,
      auditing,
    );
  }
}
