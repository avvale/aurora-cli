/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamBoundedContextDto,
    IamUpdateBoundedContextByIdDto,
    IamUpdateBoundedContextByIdHandler,
} from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/update')
@Auth('iam.boundedContext.update')
export class IamUpdateBoundedContextByIdController {
    constructor(private readonly handler: IamUpdateBoundedContextByIdHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-context by id' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: IamBoundedContextDto,
    })
    async main(
        @Body() payload: IamUpdateBoundedContextByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(payload, constraint, timezone, auditing);
    }
}
