import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateRolesHandler } from '../handlers/iam-update-roles.handler';
import { IamRole, IamUpdateRolesInput } from '../../../../graphql';

@Resolver()
@Permissions('iam.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateRolesResolver
{
    constructor(
        private readonly handler: IamUpdateRolesHandler,
    ) {}

    @Mutation('iamUpdateRoles')
    async main(
        @Args('payload') payload: IamUpdateRolesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}