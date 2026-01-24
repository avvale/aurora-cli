import { WhatsappTimeline } from '@api/graphql';
import { WhatsappGetTimelinesHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.get')
export class WhatsappGetTimelinesResolver {
  constructor(private readonly handler: WhatsappGetTimelinesHandler) {}

  @Query('whatsappGetTimelines')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappTimeline[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
