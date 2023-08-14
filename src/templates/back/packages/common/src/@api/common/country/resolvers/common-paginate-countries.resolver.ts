import { CommonPaginateCountriesHandler } from '@api/common/country';
import { Pagination } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.get')
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
