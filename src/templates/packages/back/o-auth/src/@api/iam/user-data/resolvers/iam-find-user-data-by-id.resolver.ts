import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindUserDataByIdHandler } from '../handlers/iam-find-user-data-by-id.handler';
import { IamUserData } from '../../../../graphql';

@Resolver()
@Permissions('iam.user-data.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindUserDataByIdResolver
{
    constructor(
        private readonly handler: IamFindUserDataByIdHandler,
    ) {}

    @Query('iamFindUserDataById')
    async main(
        @Args('id') id: string,
        @Args('data') data: any,
        @Timezone() timezone?: string,
    ): Promise<IamUserData>
    {
        return await this.handler.main(
            id,
            timezone,
        );
    }
}