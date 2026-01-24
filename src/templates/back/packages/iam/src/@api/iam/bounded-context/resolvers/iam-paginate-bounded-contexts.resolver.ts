/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { Pagination } from '@api/graphql';
import { IamPaginateBoundedContextsHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.get')
export class IamPaginateBoundedContextsResolver {
  constructor(private readonly handler: IamPaginateBoundedContextsHandler) {}

  @Query('iamPaginateBoundedContexts')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<Pagination> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
