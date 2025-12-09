import { ClickupList } from '@api/graphql';
import { ClickupListHandler } from '@api/support/clickup';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('clickup.list.get')
export class ClickupListResolver {
    constructor(private readonly handler: ClickupListHandler) {}

    @Query('clickupLists')
    async main(@Args('folderId') folderId?: string): Promise<ClickupList[]> {
        return await this.handler.main(folderId);
    }
}
