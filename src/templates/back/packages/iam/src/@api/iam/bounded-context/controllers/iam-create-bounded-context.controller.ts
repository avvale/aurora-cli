/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';
import { IamBoundedContextDto, IamCreateBoundedContextDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/create')
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamCreateBoundedContextController
{
    constructor(
        private readonly handler: IamCreateBoundedContextHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-context' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamCreateBoundedContextDto,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}