/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto } from '../dto';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/delete')
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteRefreshTokenByIdController
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokenByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: OAuthRefreshTokenDto })
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