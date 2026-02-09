/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonCreateAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2,
  CommonCreateAdministrativeAreaLevel2Input,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.create')
export class CommonCreateAdministrativeAreaLevel2Resolver {
  constructor(
    private readonly handler: CommonCreateAdministrativeAreaLevel2Handler,
  ) {}

  @Mutation('commonCreateAdministrativeAreaLevel2')
  async main(
    @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel2> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
