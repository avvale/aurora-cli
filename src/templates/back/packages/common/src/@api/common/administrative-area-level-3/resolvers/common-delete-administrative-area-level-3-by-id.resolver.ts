import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-delete-administrative-area-level-3-by-id.handler';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';

@Resolver()
export class CommonDeleteAdministrativeAreaLevel3ByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel3ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}