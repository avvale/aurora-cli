import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateUserHandler } from '../handlers/iam-update-user.handler';
import { IamUser, IamUpdateUserInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.user.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserResolver
{
    constructor(
        private readonly handler: IamUpdateUserHandler,
    ) {}

    @Mutation('iamUpdateUser')
    async main(
        @Args('payload') payload: IamUpdateUserInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}