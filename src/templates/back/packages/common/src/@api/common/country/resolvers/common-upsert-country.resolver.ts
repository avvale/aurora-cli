import { CommonUpsertCountryHandler } from '@api/common/country';
import { CommonCountry, CommonUpdateCountryByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, ContentLanguage, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
        @ContentLanguage() contentLanguage?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}
