import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurorajs.dev/core';

// @app
import { CommonCreateAdministrativeAreaLevel1Handler } from '../handlers/common-create-administrative-area-level-1.handler';
import { CommonAdministrativeAreaLevel1, CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';

@Resolver()
export class CommonCreateAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreaLevel1Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreaLevel1')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel1Input,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}