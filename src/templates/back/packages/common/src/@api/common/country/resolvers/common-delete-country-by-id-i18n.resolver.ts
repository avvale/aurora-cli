import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, ContentLanguage, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonDeleteCountryByIdI18nHandler } from '../handlers/common-delete-country-by-id-i18n.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
@Auth('common.country.delete')
export class CommonDeleteCountryByIdI18nResolver
{
    constructor(
        private readonly handler: CommonDeleteCountryByIdI18nHandler,
    ) {}

    @Mutation('commonDeleteCountryById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            contentLanguage,
            auditing,
        );
    }
}