import { Resolver, Args, Query } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurora-ts/core';

// @apps
import { CommonFindCountryByIdHandler } from '../handlers/common-find-country-by-id.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
export class CommonFindCountryByIdResolver
{
    constructor(
        private readonly handler: CommonFindCountryByIdHandler,
    ) {}

    @Query('commonFindCountryById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}