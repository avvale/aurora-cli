/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamBoundedContext, IamUpdateBoundedContextsInput } from '@api/graphql';
import { IamUpdateBoundedContextsHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.update')
export class IamUpdateBoundedContextsResolver {
  constructor(private readonly handler: IamUpdateBoundedContextsHandler) {}

  @Mutation('iamUpdateBoundedContexts')
  async main(
    @Args('payload') payload: IamUpdateBoundedContextsInput,
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<IamBoundedContext> {
    return await this.handler.main(
      payload,
      queryStatement,
      constraint,
      timezone,
      auditing,
    );
  }
}
