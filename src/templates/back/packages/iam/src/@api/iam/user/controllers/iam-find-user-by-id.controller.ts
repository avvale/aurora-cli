/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindUserByIdHandler, IamUserDto } from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/user/find')
@Auth('iam.user.get')
export class IamFindUserByIdController {
    constructor(private readonly handler: IamFindUserByIdHandler) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find user by id' })
    @ApiOkResponse({
        description: 'The record has been successfully requested.',
        type: IamUserDto,
    })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ) {
        return await this.handler.main(id, constraint, timezone);
    }
}
