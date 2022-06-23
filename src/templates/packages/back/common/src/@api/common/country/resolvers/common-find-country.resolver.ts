import { Resolver, Args, Query } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonFindCountryHandler } from '../handlers/common-find-country.handler';
import { CommonCountry } from '../../../../graphql';

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