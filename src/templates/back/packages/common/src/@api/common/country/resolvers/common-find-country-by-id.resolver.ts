/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonFindCountryByIdHandler } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.get')
export class CommonFindCountryByIdResolver {
  constructor(private readonly handler: CommonFindCountryByIdHandler) {}

  @Query('commonFindCountryById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
  ): Promise<CommonCountry> {
    return await this.handler.main(id, constraint, timezone, contentLanguage);
  }
}
