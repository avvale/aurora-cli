import { WhatsappTimeline, WhatsappUpdateTimelinesInput } from '@api/graphql';
import { WhatsappUpdateTimelinesHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.update')
export class WhatsappUpdateTimelinesResolver
{
    constructor(
        private readonly handler: WhatsappUpdateTimelinesHandler,
    ) {}

    @Mutation('whatsappUpdateTimelines')
    async main(
        @Args('payload') payload: WhatsappUpdateTimelinesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappTimeline>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
