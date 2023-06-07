import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonUpdateCountryByIdHandler } from '../handlers/common-update-country-by-id.handler';
import { CommonCountry, CommonUpdateCountryByIdInput } from '@api/graphql';

@Resolver()
@Auth('common.country.update')
export class CommonUpdateCountryByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateCountryByIdHandler,
    ) {}

    @Mutation('commonUpdateCountryById')
    async main(
        @Args('payload') payload: CommonUpdateCountryByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}