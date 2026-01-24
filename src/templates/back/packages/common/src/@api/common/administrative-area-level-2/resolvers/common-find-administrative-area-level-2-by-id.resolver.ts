import { CommonFindAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.get')
export class CommonFindAdministrativeAreaLevel2ByIdResolver {
  constructor(
    private readonly handler: CommonFindAdministrativeAreaLevel2ByIdHandler,
  ) {}

  @Query('commonFindAdministrativeAreaLevel2ById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<CommonAdministrativeAreaLevel2> {
    return await this.handler.main(id, constraint, timezone);
  }
}
