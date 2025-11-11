/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamAccountDto, IamFindAccountByIdHandler } from '@api/iam/account';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] account')
@Controller('iam/account/find')
@Auth('iam.account.get')
export class IamFindAccountByIdController {
    constructor(private readonly handler: IamFindAccountByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find account by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: IamAccountDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
