import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.update')
export class CommonUpdateAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel1ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel1ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
