import { MessageCountTotalRecipientsMessageHandler } from '@api/message/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.message.update')
export class MessageCountTotalRecipientsMessageResolver {
  constructor(
    private readonly handler: MessageCountTotalRecipientsMessageHandler,
  ) {}

  @Query('messageCountTotalRecipientsMessage')
  async main(
    @Args('tenantRecipientIds') tenantRecipientIds: string[],
    @Args('scopeRecipients') scopeRecipients: string[],
    @Args('tagRecipients') tagRecipients: string[],
    @Args('accountRecipientIds') accountRecipientIds: string[],
    @Args('constraint') constraint?: QueryStatement,
  ): Promise<number> {
    return await this.handler.main(
      tenantRecipientIds,
      scopeRecipients,
      tagRecipients,
      accountRecipientIds,
      constraint,
    );
  }
}
