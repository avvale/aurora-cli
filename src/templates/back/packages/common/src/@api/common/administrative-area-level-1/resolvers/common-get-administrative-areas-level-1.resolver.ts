/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonGetAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.get')
export class CommonGetAdministrativeAreasLevel1Resolver {
  constructor(
    private readonly handler: CommonGetAdministrativeAreasLevel1Handler,
  ) {}

  @Query('commonGetAdministrativeAreasLevel1')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel1[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
