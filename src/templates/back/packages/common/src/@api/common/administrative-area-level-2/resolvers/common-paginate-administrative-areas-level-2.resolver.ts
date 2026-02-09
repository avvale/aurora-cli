/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonPaginateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.get')
export class CommonPaginateAdministrativeAreasLevel2Resolver {
  constructor(
    private readonly handler: CommonPaginateAdministrativeAreasLevel2Handler,
  ) {}

  @Query('commonPaginateAdministrativeAreasLevel2')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
