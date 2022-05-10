/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { IamBoundedContextDto, IamUpdateBoundedContextsDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/update')
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateBoundedContextsController
{
    constructor(
        private readonly handler: IamUpdateBoundedContextsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-contexts' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamUpdateBoundedContextsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}