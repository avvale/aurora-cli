/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthScopeDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/delete')
@Permissions('oAuth.scope.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteScopeByIdController
{
    constructor(
        private readonly handler: OAuthDeleteScopeByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete scope by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthScopeDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}