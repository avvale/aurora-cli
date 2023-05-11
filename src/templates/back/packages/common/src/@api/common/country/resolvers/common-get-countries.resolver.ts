import { Resolver, Args, Query } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
export class CommonGetCountriesResolver
{
    constructor(
        private readonly handler: CommonGetCountriesHandler,
    ) {}

    @Query('commonGetCountries')
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