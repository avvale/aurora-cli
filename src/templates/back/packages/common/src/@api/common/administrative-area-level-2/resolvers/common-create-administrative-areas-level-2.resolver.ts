import { CommonCreateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.create')
export class CommonCreateAdministrativeAreasLevel2Resolver {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreasLevel2Handler,
  ) {}

  @Mutation('commonCreateAdministrativeAreasLevel2')
  async main(
    @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
