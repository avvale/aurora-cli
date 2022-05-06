import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreateUsersHandler } from '../handlers/iam-create-users.handler';
import { IamCreateUserInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.user.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateUsersResolver
{
    constructor(
        private readonly handler: IamCreateUsersHandler,
    ) {}

    @Mutation('iamCreateUsers')
    async main(
        @Args('payload') payload: IamCreateUserInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}