import { ClickupFolder } from '@api/graphql';
import { ClickupFolderHandler } from '@api/support/clickup';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('clickup.folder.get')
export class ClickupFolderResolver {
    constructor(private readonly handler: ClickupFolderHandler) {}

    @Query('clickupFolders')
    async main(@Args('spaceId') spaceId?: string): Promise<ClickupFolder[]> {
        return await this.handler.main(spaceId);
    }
}
