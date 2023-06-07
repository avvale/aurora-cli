import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpsertCountryHandler } from '../handlers/common-upsert-country.handler';
import { CommonCountry, CommonUpdateCountryByIdInput } from '@api/graphql';

@Resolver()
@Auth('common.country.upsert')
export class CommonUpsertCountryResolver
{
    constructor(
        private readonly handler: CommonUpsertCountryHandler,
    ) {}

    @Mutation('commonUpsertCountry')
    async main(
        @Args('payload') payload: CommonUpdateCountryByIdInput,
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