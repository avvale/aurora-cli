/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonCreateAdministrativeAreaLevel1Handler } from '@api/common/administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel1,
  CommonCreateAdministrativeAreaLevel1Input,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.create')
export class CommonCreateAdministrativeAreaLevel1Resolver {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreaLevel1Handler,
  ) {}

  @Mutation('commonCreateAdministrativeAreaLevel1')
  async main(
    @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel1> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
