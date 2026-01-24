import { CommonPaginateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.get')
export class CommonPaginateAdministrativeAreasLevel3Resolver {
  constructor(
    private readonly handler: CommonPaginateAdministrativeAreasLevel3Handler,
  ) {}

  @Query('commonPaginateAdministrativeAreasLevel3')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
