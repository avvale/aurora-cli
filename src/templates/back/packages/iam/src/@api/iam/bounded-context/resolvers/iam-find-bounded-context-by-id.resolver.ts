import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindBoundedContextByIdHandler } from '../handlers/iam-find-bounded-context-by-id.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Auth('iam.boundedContext.get')
export class IamFindBoundedContextByIdResolver
{
    constructor(
        private readonly handler: IamFindBoundedContextByIdHandler,
    ) {}

    @Query('iamFindBoundedContextById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}