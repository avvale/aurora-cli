import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetBoundedContextsHandler } from '../handlers/iam-get-bounded-contexts.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.get')
export class IamGetBoundedContextsResolver
{
    constructor(
        private readonly handler: IamGetBoundedContextsHandler,
    ) {}

    @Query('iamGetBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}