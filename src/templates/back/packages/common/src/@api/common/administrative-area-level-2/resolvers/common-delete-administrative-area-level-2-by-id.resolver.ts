/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.delete')
export class CommonDeleteAdministrativeAreaLevel2ByIdResolver {
  constructor(
    private readonly handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler,
  ) {}

  @Mutation('commonDeleteAdministrativeAreaLevel2ById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel2> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
