import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

// @app
import { IamUserMeta } from '@api/graphql';
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';

@Resolver()
@Auth('iam.userData.get')
export class IamFindUserMetaByIdResolver {
  constructor(private readonly handler: IamFindUserMetaByIdHandler) {}

  @Query('iamFindUserMetaById')
  async main(
    @Args('id') id: string,
    @Timezone() timezone?: string,
  ): Promise<IamUserMeta> {
    return await this.handler.main(id, timezone);
  }
}
