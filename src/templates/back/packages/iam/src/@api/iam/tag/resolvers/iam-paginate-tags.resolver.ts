import { Pagination } from '@api/graphql';
import { IamPaginateTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.get')
export class IamPaginateTagsResolver
{
    constructor(
        private readonly handler: IamPaginateTagsHandler,
    ) {}

    @Query('iamPaginateTags')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
