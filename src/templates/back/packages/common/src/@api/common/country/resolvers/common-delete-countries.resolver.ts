import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
@Auth('common.country.delete')
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
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}