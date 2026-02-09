/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonDeleteAdministrativeAreaLevel1ByIdHandler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.delete')
export class CommonDeleteAdministrativeAreaLevel1ByIdResolver {
  constructor(
    private readonly handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler,
  ) {}

  @Mutation('commonDeleteAdministrativeAreaLevel1ById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<CommonAdministrativeAreaLevel1> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
