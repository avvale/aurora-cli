import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-delete-administrative-area-level-1-by-id.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
export class CommonDeleteAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}