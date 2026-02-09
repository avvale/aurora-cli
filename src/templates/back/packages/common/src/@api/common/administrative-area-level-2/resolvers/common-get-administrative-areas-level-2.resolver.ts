/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonGetAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.get')
export class CommonGetAdministrativeAreasLevel2Resolver {
  constructor(
    private readonly handler: CommonGetAdministrativeAreasLevel2Handler,
  ) {}

  @Query('commonGetAdministrativeAreasLevel2')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel2[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
