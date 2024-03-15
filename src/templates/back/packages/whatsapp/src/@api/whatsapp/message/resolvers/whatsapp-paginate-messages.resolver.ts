import { Pagination } from '@api/graphql';
import { WhatsappPaginateMessagesHandler } from '@api/whatsapp/message';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('whatsapp.message.get')
export class WhatsappPaginateMessagesResolver
{
    constructor(
        private readonly handler: WhatsappPaginateMessagesHandler,
    ) {}

    @Query('whatsappPaginateMessages')
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
