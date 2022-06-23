import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
@Permissions('iam.account.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteAccountByIdResolver
{
    constructor(
        private readonly handler: IamDeleteAccountByIdHandler,
    ) {}

    @Mutation('iamDeleteAccountById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}