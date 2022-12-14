import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// @apps
import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-update-administrative-area-level-3-by-id.handler';
import { CommonAdministrativeAreaLevel3, CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel3ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel3ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel3ByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}