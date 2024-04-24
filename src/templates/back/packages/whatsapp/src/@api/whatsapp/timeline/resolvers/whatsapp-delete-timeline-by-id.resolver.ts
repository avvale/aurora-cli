import { WhatsappTimeline } from '@api/graphql';
import { WhatsappDeleteTimelineByIdHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.delete')
export class WhatsappDeleteTimelineByIdResolver
{
    constructor(
        private readonly handler: WhatsappDeleteTimelineByIdHandler,
    ) {}

    @Mutation('whatsappDeleteTimelineById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<WhatsappTimeline>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
