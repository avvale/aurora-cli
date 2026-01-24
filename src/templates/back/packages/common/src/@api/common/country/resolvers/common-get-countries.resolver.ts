import { CommonGetCountriesHandler } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.get')
export class CommonGetCountriesResolver {
  constructor(private readonly handler: CommonGetCountriesHandler) {}

  @Query('commonGetCountries')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
  ): Promise<CommonCountry[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      contentLanguage,
    );
  }
}
