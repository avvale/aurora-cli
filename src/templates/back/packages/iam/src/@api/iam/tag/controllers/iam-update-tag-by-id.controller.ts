/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IamTagDto,
  IamUpdateTagByIdDto,
  IamUpdateTagByIdHandler,
} from '@api/iam/tag';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] tag')
@Controller('iam/tag/update')
@Auth('iam.tag.update')
export class IamUpdateTagByIdController {
  constructor(private readonly handler: IamUpdateTagByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update tag by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: IamTagDto,
  })
  async main(
    @Body() payload: IamUpdateTagByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
