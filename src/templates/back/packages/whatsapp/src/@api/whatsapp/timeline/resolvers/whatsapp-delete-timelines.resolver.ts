import { WhatsappTimeline } from '@api/graphql';
import { WhatsappDeleteTimelinesHandler } from '@api/whatsapp/timeline';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.timeline.delete')
export class WhatsappDeleteTimelinesResolver {
  constructor(private readonly handler: WhatsappDeleteTimelinesHandler) {}

  @Mutation('whatsappDeleteTimelines')
  async main(
    @Args('query') queryStatement?: QueryStatement,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<WhatsappTimeline[]> {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
