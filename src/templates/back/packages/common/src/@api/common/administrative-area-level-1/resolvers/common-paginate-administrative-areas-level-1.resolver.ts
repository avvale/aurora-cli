import { CommonPaginateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.get')
export class CommonPaginateAdministrativeAreasLevel1Resolver {
  constructor(
    private readonly handler: CommonPaginateAdministrativeAreasLevel1Handler,
  ) {}

  @Query('commonPaginateAdministrativeAreasLevel1')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
