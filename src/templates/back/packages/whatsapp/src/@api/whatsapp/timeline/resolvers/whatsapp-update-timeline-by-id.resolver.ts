import { WhatsappTimeline, WhatsappUpdateTimelineByIdInput } from '@api/graphql';
import { WhatsappUpdateTimelineByIdHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.update')
export class WhatsappUpdateTimelineByIdResolver
{
    constructor(
        private readonly handler: WhatsappUpdateTimelineByIdHandler,
    ) {}

    @Mutation('whatsappUpdateTimelineById')
    async main(
        @Args('payload') payload: WhatsappUpdateTimelineByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappTimeline>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
