/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamBoundedContextDto, IamUpdateBoundedContextDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateBoundedContextHandler } from '../handlers/iam-update-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/update')
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateBoundedContextController
{
    constructor(
        private readonly handler: IamUpdateBoundedContextHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-context' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamBoundedContextDto})
    async main(
        @Body() payload: IamUpdateBoundedContextDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}