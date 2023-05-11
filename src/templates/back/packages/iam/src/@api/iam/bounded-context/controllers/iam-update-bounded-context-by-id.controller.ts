/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/update')
@Auth('iam.boundedContext.update')
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