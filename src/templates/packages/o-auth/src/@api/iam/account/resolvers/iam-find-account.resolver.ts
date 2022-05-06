import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';
import { IamAccount } from '../../../../graphql';

@Resolver()
@Permissions('iam.account.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindAccountResolver
{
    constructor(
        private readonly handler: IamFindAccountHandler,
    ) {}

    @Query('iamFindAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}