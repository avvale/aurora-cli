import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonDeleteAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-delete-administrative-area-level-1-by-id.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.delete')
export class CommonDeleteAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}