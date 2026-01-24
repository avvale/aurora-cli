import { CommonCreateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.create')
export class CommonCreateAdministrativeAreasLevel1Resolver {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreasLevel1Handler,
  ) {}

  @Mutation('commonCreateAdministrativeAreasLevel1')
  async main(
    @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
