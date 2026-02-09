/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonFindAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.get')
export class CommonFindAdministrativeAreaLevel1Resolver {
  constructor(
    private readonly handler: CommonFindAdministrativeAreaLevel1Handler,
  ) {}

  @Query('commonFindAdministrativeAreaLevel1')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel1> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
