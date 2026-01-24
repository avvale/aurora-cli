/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamBoundedContext } from '@api/graphql';
import { IamFindBoundedContextHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.boundedContext.get')
export class IamFindBoundedContextResolver {
  constructor(private readonly handler: IamFindBoundedContextHandler) {}

  @Query('iamFindBoundedContext')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<IamBoundedContext> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
