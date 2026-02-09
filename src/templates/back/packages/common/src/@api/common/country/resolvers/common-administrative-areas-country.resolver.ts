/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonAdministrativeAreasCountryHandler } from '@api/common/country';
import { CommonCountry } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.get')
export class CommonAdministrativeAreasCountryResolver {
  constructor(
    private readonly handler: CommonAdministrativeAreasCountryHandler,
  ) {}

  @Query('commonAdministrativeAreasCountry')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonCountry[]> {
    return await this.handler.main(
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
