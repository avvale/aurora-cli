import { IamBoundedContext } from '@api/graphql';
import { IamFindBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
