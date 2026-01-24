import { ClickupSpace } from '@api/graphql';
import { ClickupSpaceHandler } from '@api/support/clickup';
import { Auth } from '@aurora/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('clickup.space.get')
export class ClickupSpaceResolver {
  constructor(private readonly handler: ClickupSpaceHandler) {}

  @Query('clickupSpaces')
  async main(@Args('teamId') teamId?: string): Promise<ClickupSpace[]> {
    return await this.handler.main(teamId);
  }
}
