import { Resolver, Args, Query } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonFindCountryHandler } from '../handlers/common-find-country.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
export class CommonFindCountryResolver
{
    constructor(
        private readonly handler: CommonFindCountryHandler,
    ) {}

    @Query('commonFindCountry')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}