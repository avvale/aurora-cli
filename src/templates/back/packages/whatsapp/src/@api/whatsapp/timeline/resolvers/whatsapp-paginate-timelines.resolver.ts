import { Pagination } from '@api/graphql';
import { WhatsappPaginateTimelinesHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.get')
export class WhatsappPaginateTimelinesResolver
{
    constructor(
        private readonly handler: WhatsappPaginateTimelinesHandler,
    ) {}

    @Query('whatsappPaginateTimelines')
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
