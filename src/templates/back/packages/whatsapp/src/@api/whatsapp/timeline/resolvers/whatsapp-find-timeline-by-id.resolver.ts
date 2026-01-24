import { WhatsappTimeline } from '@api/graphql';
import { WhatsappFindTimelineByIdHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.get')
export class WhatsappFindTimelineByIdResolver {
  constructor(private readonly handler: WhatsappFindTimelineByIdHandler) {}

  @Query('whatsappFindTimelineById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappTimeline> {
    return await this.handler.main(id, constraint, timezone);
  }
}
