import { CommonDeleteCountryByIdHandler } from '@api/common/country';
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
export class CommonDeleteCountryByIdResolver {
  constructor(private readonly handler: CommonDeleteCountryByIdHandler) {}

  @Mutation('commonDeleteCountryById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @ContentLanguage() contentLanguage?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonCountry> {
    return await this.handler.main(
      id,
      constraint,
      timezone,
      contentLanguage,
      auditing,
    );
  }
}
