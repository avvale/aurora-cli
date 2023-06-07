import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';
import { CommonCountry, CommonCreateCountryInput } from '@api/graphql';

@Resolver()
@Auth('common.country.create')
export class CommonCreateCountryResolver
{
    constructor(
        private readonly handler: CommonCreateCountryHandler,
    ) {}

    @Mutation('commonCreateCountry')
    async main(
        @Args('payload') payload: CommonCreateCountryInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}