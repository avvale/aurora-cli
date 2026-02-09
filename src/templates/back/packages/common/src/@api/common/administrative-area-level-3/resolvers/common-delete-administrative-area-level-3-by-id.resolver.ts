/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.delete')
export class CommonDeleteAdministrativeAreaLevel3ByIdResolver {
  constructor(
    private readonly handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler,
  ) {}

  @Mutation('commonDeleteAdministrativeAreaLevel3ById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel3> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
