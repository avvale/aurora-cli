import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonGetAdministrativeAreasLevel1Handler } from '../handlers/common-get-administrative-areas-level-1.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.get')
export class CommonGetAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly handler: CommonGetAdministrativeAreasLevel1Handler,
    ) {}

    @Query('commonGetAdministrativeAreasLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}