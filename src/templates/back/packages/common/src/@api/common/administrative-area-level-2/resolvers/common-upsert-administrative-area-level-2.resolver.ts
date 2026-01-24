import { CommonUpsertAdministrativeAreaLevel2Handler } from '@api/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2,
  CommonUpdateAdministrativeAreaLevel2ByIdInput,
} from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.upsert')
export class CommonUpsertAdministrativeAreaLevel2Resolver {
  constructor(
    private readonly handler: CommonUpsertAdministrativeAreaLevel2Handler,
  ) {}

  @Mutation('commonUpsertAdministrativeAreaLevel2')
  async main(
    @Args('payload') payload: CommonUpdateAdministrativeAreaLevel2ByIdInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel2> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
