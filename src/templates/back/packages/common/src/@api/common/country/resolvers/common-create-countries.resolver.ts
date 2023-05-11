import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurorajs.dev/core';

// @app
import { CommonCreateCountriesHandler } from '../handlers/common-create-countries.handler';
import { CommonCreateCountryInput } from '@api/graphql';

@Resolver()
export class CommonCreateCountriesResolver
{
    constructor(
        private readonly handler: CommonCreateCountriesHandler,
    ) {}

    @Mutation('commonCreateCountries')
    async main(
        @Args('payload') payload: CommonCreateCountryInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}