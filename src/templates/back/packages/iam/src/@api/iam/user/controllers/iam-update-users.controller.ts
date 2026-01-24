/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamUpdateUsersDto,
  IamUpdateUsersHandler,
  IamUserDto,
} from '@api/iam/user';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] user')
@Controller('iam/users/update')
@Auth('iam.user.update')
export class IamUpdateUsersController {
  constructor(private readonly handler: IamUpdateUsersHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update users' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamUserDto,
  })
  async main(
    @Body() payload: IamUpdateUsersDto,
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
