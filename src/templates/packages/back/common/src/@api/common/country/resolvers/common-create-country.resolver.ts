import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';
import { CommonCountry, CommonCreateCountryInput } from '../../../../graphql';

@Resolver()
export class CommonCreateCountryResolver
{
    constructor(
        private readonly handler: CommonCreateCountryHandler,
    ) {}

    @Mutation('commonCreateCountry')
    async main(
        @Args('payload') payload: CommonCreateCountryInput,
        @Timezone() timezone?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}