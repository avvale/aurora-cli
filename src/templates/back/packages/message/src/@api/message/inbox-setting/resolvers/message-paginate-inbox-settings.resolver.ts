import { Pagination } from '@api/graphql';
import { MessagePaginateInboxSettingsHandler } from '@api/message/inbox-setting';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('message.inboxSetting.get')
export class MessagePaginateInboxSettingsResolver
{
    constructor(
        private readonly handler: MessagePaginateInboxSettingsHandler,
    ) {}

    @Query('messagePaginateInboxSettings')
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
