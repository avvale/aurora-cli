import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurorajs.dev/core';

// @app
import { CommonCreateAdministrativeAreaLevel2Handler } from '../handlers/common-create-administrative-area-level-2.handler';
import { CommonAdministrativeAreaLevel2, CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';

@Resolver()
export class CommonCreateAdministrativeAreaLevel2Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel2Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel2')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}