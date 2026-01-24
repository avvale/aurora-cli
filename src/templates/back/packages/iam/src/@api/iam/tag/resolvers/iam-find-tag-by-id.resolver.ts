import { IamTag } from '@api/graphql';
import { IamFindTagByIdHandler } from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('iam.tag.get')
export class IamFindTagByIdResolver {
  constructor(private readonly handler: IamFindTagByIdHandler) {}

  @Query('iamFindTagById')
  async main(
    @Args('id') id: string,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ): Promise<IamTag> {
    return await this.handler.main(id, constraint, timezone);
  }
}
