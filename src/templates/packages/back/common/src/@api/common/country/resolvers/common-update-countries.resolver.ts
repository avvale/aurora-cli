import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';
import { CommonCountry, CommonUpdateCountriesInput } from '@api/graphql';

@Resolver()
export class CommonUpdateCountriesResolver
{
    constructor(
        private readonly handler: CommonUpdateCountriesHandler,
    ) {}

    @Mutation('commonUpdateCountries')
    async main(
        @Args('payload') payload: CommonUpdateCountriesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}