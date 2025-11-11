import { IamTag } from '@api/graphql';
import { IamGetTagsHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.get')
export class IamGetTagsResolver {
    constructor(private readonly handler: IamGetTagsHandler) {}

    @Query('iamGetTags')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTag[]> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
