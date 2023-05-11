import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
export class CommonDeleteCountriesResolver
{
    constructor(
        private readonly handler: CommonDeleteCountriesHandler,
    ) {}

    @Mutation('commonDeleteCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}