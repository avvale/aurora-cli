import { OAuthApplication } from '@api/graphql';
import { OAuthDeleteApplicationByIdHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.delete')
export class OAuthDeleteApplicationByIdResolver {
    constructor(private readonly handler: OAuthDeleteApplicationByIdHandler) {}

    @Mutation('oAuthDeleteApplicationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication> {
        return await this.handler.main(id, constraint, timezone, auditing);
    }
}
