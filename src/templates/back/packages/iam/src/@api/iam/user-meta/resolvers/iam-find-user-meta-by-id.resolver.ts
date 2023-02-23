import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// @app
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';
import { IamUserMeta } from '@api/graphql';

@Resolver()
@Permissions('iam.userData.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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