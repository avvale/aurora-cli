/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CommonDeleteResourceByIdHandler,
  CommonResourceDto,
} from '@api/common/resource';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[common] resource')
@Controller('common/resource/delete')
@Auth('common.resource.delete')
export class CommonDeleteResourceByIdController {
  constructor(private readonly handler: CommonDeleteResourceByIdHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete resource by id' })
  @ApiOkResponse({
    description: 'The record has been deleted successfully.',
    type: CommonResourceDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(id, constraint, timezone, auditing);
  }
}
