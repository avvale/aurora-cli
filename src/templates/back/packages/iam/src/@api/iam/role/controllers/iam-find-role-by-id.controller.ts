/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IamFindRoleByIdHandler, IamRoleDto } from '@api/iam/role';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] role')
@Controller('iam/role/find')
@Auth('iam.role.get')
export class IamFindRoleByIdController {
  constructor(private readonly handler: IamFindRoleByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find role by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: IamRoleDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
