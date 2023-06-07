import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';
import { CommonCountry, CommonUpdateCountriesInput } from '@api/graphql';

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
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}