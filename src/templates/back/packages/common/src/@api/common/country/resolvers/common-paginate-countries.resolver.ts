import { Resolver, Args, Query } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonPaginateCountriesHandler } from '../handlers/common-paginate-countries.handler';
import { Pagination } from '@api/graphql';

@Resolver()
export class CommonPaginateCountriesResolver
{
    constructor(
        private readonly handler: CommonPaginateCountriesHandler,
    ) {}

    @Query('commonPaginateCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}