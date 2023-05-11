import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-update-administrative-area-level-2-by-id.handler';
import { CommonAdministrativeAreaLevel2, CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel2ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel2ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel2ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}