import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-delete-administrative-area-level-2-by-id.handler';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel2.delete')
export class CommonDeleteAdministrativeAreaLevel2ByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel2ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}