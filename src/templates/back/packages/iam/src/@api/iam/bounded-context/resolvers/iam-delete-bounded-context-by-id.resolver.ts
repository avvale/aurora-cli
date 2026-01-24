/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamBoundedContext } from '@api/graphql';
import { IamDeleteBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.delete')
export class IamDeleteBoundedContextByIdResolver {
  constructor(private readonly handler: IamDeleteBoundedContextByIdHandler) {}

  @Mutation('iamDeleteBoundedContextById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamBoundedContext> {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
