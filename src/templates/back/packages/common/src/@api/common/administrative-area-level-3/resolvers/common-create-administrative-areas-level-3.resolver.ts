/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonCreateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.create')
export class CommonCreateAdministrativeAreasLevel3Resolver {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreasLevel3Handler,
  ) {}

  @Mutation('commonCreateAdministrativeAreasLevel3')
  async main(
    @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<boolean> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
