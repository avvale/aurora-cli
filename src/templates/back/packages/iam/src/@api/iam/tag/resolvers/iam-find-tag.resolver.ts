import { IamTag } from '@api/graphql';
import { IamFindTagHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.get')
export class IamFindTagResolver {
    constructor(private readonly handler: IamFindTagHandler) {}

    @Query('iamFindTag')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTag> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
