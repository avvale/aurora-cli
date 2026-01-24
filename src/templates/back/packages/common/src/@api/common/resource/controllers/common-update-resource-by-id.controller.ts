/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonResourceDto,
  CommonUpdateResourceByIdDto,
  CommonUpdateResourceByIdHandler,
} from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resource/update')
@Auth('common.resource.update')
export class CommonUpdateResourceByIdController {
  constructor(private readonly handler: CommonUpdateResourceByIdHandler) {}

  @Put()
  @ApiOperation({ summary: 'Update resource by id' })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CommonResourceDto,
  })
  async main(
    @Body() payload: CommonUpdateResourceByIdDto,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
