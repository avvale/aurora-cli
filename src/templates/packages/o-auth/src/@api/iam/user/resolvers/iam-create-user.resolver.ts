import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateUserHandler } from '../handlers/iam-create-user.handler';
import { IamUser, IamCreateUserInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.user.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateUserResolver
{
    constructor(
        private readonly handler: IamCreateUserHandler,
    ) {}

    @Mutation('iamCreateUser')
    async main(
        @Args('payload') payload: IamCreateUserInput,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}