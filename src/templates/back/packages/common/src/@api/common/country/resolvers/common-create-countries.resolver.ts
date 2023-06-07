import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateCountriesHandler } from '../handlers/common-create-countries.handler';
import { CommonCreateCountryInput } from '@api/graphql';

@Resolver()
@Auth('common.country.create')
export class CommonCreateCountriesResolver
{
    constructor(
        private readonly handler: CommonCreateCountriesHandler,
    ) {}

    @Mutation('commonCreateCountries')
    async main(
        @Args('payload') payload: CommonCreateCountryInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}