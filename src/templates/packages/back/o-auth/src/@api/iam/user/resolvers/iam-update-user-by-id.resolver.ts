import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateUserByIdHandler } from '../handlers/iam-update-user-by-id.handler';
import { IamUser, IamUpdateUserByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.user.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserByIdResolver
{
    constructor(
        private readonly handler: IamUpdateUserByIdHandler,
    ) {}

    @Mutation('iamUpdateUserById')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @Args('constraint') constraint?: QueryStatement,
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