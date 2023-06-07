import { Resolver, Args, Query } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonFindCountryHandler } from '../handlers/common-find-country.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
@Auth('common.country.get')
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