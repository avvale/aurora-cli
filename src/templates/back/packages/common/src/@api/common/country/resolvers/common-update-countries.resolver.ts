import { CommonUpdateCountriesHandler } from '@api/common/country';
import { CommonCountry, CommonUpdateCountriesInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.country.update')
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
        @ContentLanguage() contentLanguage?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}
