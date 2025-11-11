/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    IamBoundedContextDto,
    IamUpdateBoundedContextsDto,
    IamUpdateBoundedContextsHandler,
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
@Controller('iam/bounded-contexts/update')
@Auth('iam.boundedContext.update')
export class IamUpdateBoundedContextsController {
    constructor(private readonly handler: IamUpdateBoundedContextsHandler) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-contexts' })
    @ApiOkResponse({
        description: 'The record has been successfully updated.',
        type: IamBoundedContextDto,
    })
    async main(
        @Body() payload: IamUpdateBoundedContextsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ) {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
