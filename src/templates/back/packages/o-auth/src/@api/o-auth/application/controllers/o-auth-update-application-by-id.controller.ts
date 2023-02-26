/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateApplicationByIdHandler } from '../handlers/o-auth-update-application-by-id.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/update')
@Auth('oAuth.application.update')
export class OAuthUpdateApplicationByIdController
{
    constructor(
        private readonly handler: OAuthUpdateApplicationByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthUpdateApplicationByIdDto,
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