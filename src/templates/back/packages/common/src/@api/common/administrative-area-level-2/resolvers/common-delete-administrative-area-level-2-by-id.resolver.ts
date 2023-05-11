import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-delete-administrative-area-level-2-by-id.handler';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';

@Resolver()
export class CommonDeleteAdministrativeAreaLevel2ByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel2ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}