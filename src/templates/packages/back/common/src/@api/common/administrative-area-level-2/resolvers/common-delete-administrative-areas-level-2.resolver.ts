import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonDeleteAdministrativeAreasLevel2Handler } from '../handlers/common-delete-administrative-areas-level-2.handler';
import { CommonAdministrativeAreaLevel2 } from '../../../../graphql';

@Resolver()
export class CommonDeleteAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreasLevel2Handler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}