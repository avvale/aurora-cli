/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonFindAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.get')
export class CommonFindAdministrativeAreaLevel3ByIdResolver {
  constructor(
    private readonly handler: CommonFindAdministrativeAreaLevel3ByIdHandler,
  ) {}

  @Query('commonFindAdministrativeAreaLevel3ById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel3> {
    return await this.handler.main(id, constraint, timezone);
  }
}
