import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.get')
export class IamFindBoundedContextResolver
{
    constructor(
        private readonly handler: IamFindBoundedContextHandler,
    ) {}

    @Query('iamFindBoundedContext')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}