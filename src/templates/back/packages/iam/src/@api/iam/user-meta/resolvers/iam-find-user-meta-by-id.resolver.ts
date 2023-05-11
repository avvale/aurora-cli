import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';
import { IamUserMeta } from '@api/graphql';

@Resolver()
@Auth('iam.userData.get')
export class IamFindUserMetaByIdResolver
{
    constructor(
        private readonly handler: IamFindUserMetaByIdHandler,
    ) {}

    @Query('iamFindUserMetaById')
    async main(
        @Args('id') id: string,
        @Timezone() timezone?: string,
    ): Promise<IamUserMeta>
    {
        return await this.handler.main(
            id,
            timezone,
        );
    }
}