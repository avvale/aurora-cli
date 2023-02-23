/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/update')
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateBoundedContextByIdController
{
    constructor(
        private readonly handler: IamUpdateBoundedContextByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamUpdateBoundedContextByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}