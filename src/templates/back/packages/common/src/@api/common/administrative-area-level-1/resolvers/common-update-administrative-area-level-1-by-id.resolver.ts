import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-update-administrative-area-level-1-by-id.handler';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel1ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel1ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}