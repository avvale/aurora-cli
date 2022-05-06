import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';
import { IamPermission } from '../../../../graphql';

@Resolver()
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeletePermissionByIdResolver
{
    constructor(
        private readonly handler: IamDeletePermissionByIdHandler,
    ) {}

    @Mutation('iamDeletePermissionById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}